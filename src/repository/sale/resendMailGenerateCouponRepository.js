import { API } from 'aws-amplify';
import { getUser } from 'graphql/queries';
import generateCouponMailBodyTemplate from './mailTemplate/generateCouponMailBodyTemplate';
import headerRowMailTemplate from './mailTemplate/headerRowMailTemplate';
import rowMailTemplate from './mailTemplate/rowMailTemplate';

export default async function resendMailRepository(
  data,
  serialCoupons,
  mailSetting
) {
  try {
    let rows = '';
    for (const coupon of serialCoupons) {
      rows += headerRowMailTemplate(coupon?.name);
      for (let index = 0; index < coupon?.codes.length; index++) {
        const serial = coupon.codes[index];
        let date = new Date();
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

        const expired =
          dateValidEnd === null ? '-' : dateValidEnd.split('T')[0];
        const isRowspan = index === 0;
        const dataCell = rowMailTemplate(isRowspan, coupon?.codes?.length);

        rows += dataCell
          .replace('CODE', serial.code)
          .replace('EXPIRED', expired)
          .replace('DESCRIPTION', serial?.coupon?.description);
      }
    }

    const customer = await API.graphql({
      query: getUser,
      variables: { id: data.saleCouponOwnerId },
    });

    const template = mailSetting[0]?.body;
    const mailBody = generateCouponMailBodyTemplate(
      rows,
      template?.generateCouponMailTemplate,
      template?.logoUrl
    );

    const myInit = {
      body: {
        toAddresses: [customer?.data?.getUser?.email],
        replyToAddresses: [template?.sourceMail],
        source: template?.sourceMail,
        content: mailBody,
        title: template?.generateCouponMailTemplate?.title,
      }, // replace this with attributes you need
    };
    await API.post('sendMail', '/sendMail', myInit).catch((e) => {});
  } catch (e) {}
}
