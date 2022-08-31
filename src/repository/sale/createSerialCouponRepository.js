import { API } from 'aws-amplify';
import { createCouponSerialCode } from 'graphql/mutations';
import headerRowMailTemplate from './mailTemplate/headerRowMailTemplate';
import rowMailTemplate from './mailTemplate/rowMailTemplate';
import generateCouponMailBodyTemplate from './mailTemplate/generateCouponMailBodyTemplate';

export default async function createSerialCouponRepository(
  generateCoupon,
  mailTemplate,
  serialCoupons
) {
  let rows = '';
  //
  console.log(generateCoupon);
  for (const coupon of serialCoupons) {
    rows += headerRowMailTemplate(coupon.name);
    let description = coupon.description;

    //
    for (let index = 0; index < coupon.codes.length; index++) {
      const serial = coupon.codes[index];
      let date = new Date();
      let dateValidStart = serial.period === 0 ? null : date.toISOString();
      let dateValidEnd = '';
      if (serial.period === 0) {
        dateValidEnd = null;
      } else {
        dateValidEnd = new Date(
          new Date(new Date().setMonth(date.getMonth() + 12)).setDate(
            date.getDate() - 1
          )
        ).toISOString();
      }

      const expired = dateValidEnd === null ? '-' : dateValidEnd.split('T')[0];
      const isRowspan = index === 0 ? true : false;
      const dataCell = rowMailTemplate(isRowspan, coupon.codes.length);
      description = description === undefined ? '' : description;

      rows += dataCell
        .replace('CODE', serial.code)
        .replace('EXPIRED', expired)
        .replace('DESCRIPTION', description);

      const serialCodeBody = {
        saleCouponSerialCouponsId: generateCoupon?.saleId,
        couponSerialCodeOwnerId: generateCoupon?.customerId,
        couponSerialCodeCouponId: serial.id,
        price: generateCoupon?.price,
        code: serial.code,
        dateValidStart: dateValidStart,
        dateValidEnd: dateValidEnd,
      };

      await API.graphql({
        query: createCouponSerialCode,
        variables: { input: serialCodeBody },
      });
    }
  }

  if (mailTemplate !== undefined) {
    const mailBody = generateCouponMailBodyTemplate(
      rows,
      mailTemplate.generateCouponMailTemplate,
      mailTemplate.logoUrl
    );
    const myInit = {
      body: {
        toAddresses: [generateCoupon?.customerMail],
        replyToAddresses: [mailTemplate.sourceMail],
        source: mailTemplate.sourceMail,
        content: mailBody,
        title: mailTemplate.generateCouponMailTemplate.title,
      }, // replace this with attributes you need
    };
    API.post('sendMail', '/sendMail', myInit);
  }
}
