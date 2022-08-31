import randomString from './randomString';

export default function generateSerialCoupon(data) {
  let serials = [];
  serials.push({
    id: data.coupons?.id,
    name: data.coupons?.shortcut,
    coupon: data.coupons?.name,
    quantity: data.quantity,
    period: data.coupons?.period,
    description: data.description,
  });

  if (data?.couponDiscountPackage?.items) {
    let discountCoupon = data.couponDiscountPackage?.items?.map(
      (couponDiscount) => {
        const coupon = this.props.coupons.filter(
          (filter) => filter.id === couponDiscount.couponDiscountPackageCouponId
        );

        return {
          id: coupon.id,
          name: coupon.shortcut,
          coupon: coupon.name,
          quantity: couponDiscount.quantity,
          period: coupon.period,
          description: coupon.description,
        };
      }
    );
    serials.push(...discountCoupon);
  }

  let listCoupons = [];
  let coupons = [];
  for (let index = 0; index < serials.length; index++) {
    let serialCode = [];
    let data = serials[index];
    for (let index = 0; index < data.quantity; index++) {
      let codes = randomString(data.name);
      serialCode.push({
        id: data.id,
        code: codes,
        period: data.period,
      });
      listCoupons.push({
        id: data.id,
        code: codes,
        period: data.period,
      });
    }
    coupons.push({
      name: data.coupon,
      codes: serialCode,
      description: serials[index].description,
    });
  }

  return coupons;
}
