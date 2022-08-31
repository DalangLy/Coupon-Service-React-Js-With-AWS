import { API } from 'aws-amplify';
import {
  listCouponSerialCodes,
  getSaleCoupon,
  listCouponApplieds,
} from 'graphql/queries';

export default async function verifyTicketRepository(code) {
  var data = {
    success: false,
    message: '',
    status: 'Failed',
    serialCouponId: '',
    sale: '',
    coupon: '',
    owner: '',
    expiredDate: null,
  };

  if (code.length <= 8 || code.length >= 12) {
    data.message = 'Code must greater than 8 or less than 12';
  } else {
    await API.graphql({
      query: listCouponSerialCodes,
      variables: { filter: { code: { eq: code } } },
    })
      .then(async (res) => {
        const coupon = res.data.listCouponSerialCodes.items;
        if (coupon.length === 0) {
          data.message = 'This code is invalid';
          return data;
        }

        const sale = await API.graphql({
          query: getSaleCoupon,
          variables: {
            id: coupon[0].saleCouponSerialCouponsId,
          },
        });

        const couponApplied = await API.graphql({
          query: listCouponApplieds,
          variables: {
            filter: {
              couponAppliedCouponId: {
                eq: coupon[0].id,
              },
            },
          },
        });

        if (
          sale.data.getSaleCoupon.saleCouponApproverId === null ||
          sale.data.getSaleCoupon.deletedAt !== null
        ) {
          data.message = 'Invalid Code';
          return data;
        }

        if (couponApplied.data.listCouponApplieds.items.length > 0) {
          data.message = `This code is already used on ${
            couponApplied.data.listCouponApplieds.items[0].createdAt.split(
              'T'
            )[0]
          }`;
          return data;
        }

        const item = coupon[0];
        if (item.deletedAt === null || item.deletedAt === undefined) {
          if (item.dateValidStart === null && item.dateValidEnd === null) {
            data.message = 'This code is available.';
            data.success = true;
            data.status = 'Success';
            data.serialCouponId = item.id;
            data.sale = sale.data.getSaleCoupon;
            data.couponId = item.coupon.id;
            data.coupon = item.coupon.name;
            data.owner = item.owner;
            data.expiredDate = item.dateValidEnd;
          } else {
            let now = Date.parse(new Date());
            let startDate = Date.parse(new Date(item.dateValidStart));
            let endDate = Date.parse(new Date(item.dateValidEnd));
            //
            if (now > endDate) {
              data.message = 'This code is expired';
            }
            //
            else if (now < startDate) {
              data.message = 'This code is invalid date';
            } else {
              data.message = 'This code is available.';
              data.success = true;
              data.status = 'Success';
              data.serialCouponId = item.id;
              data.sale = sale.data.getSaleCoupon;
              data.couponId = item.serialCouponCouponId;
              data.coupon = item.coupon.name;
              data.owner = item.owner;
              data.expiredDate = item.dateValidEnd;
            }
          }
        } else {
          data.message = `This code already used on ${
            item.deletedAt.split('T')[0]
          }.`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return data;
}
