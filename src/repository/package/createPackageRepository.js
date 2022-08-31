import { API } from 'aws-amplify';
import { getPackage } from 'graphql/queries';
import {
  createPackage,
  createCouponDiscountPackage,
  createPackageCouponDiscounts,
} from 'graphql/mutations';

export default async function createPackageRepository(data) {
  const dataPackage = {
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    discount: data.discount,
    couponPackagesId: data.couponPackagesId,
    description: data.description,
  };

  const response = await API.graphql({
    query: createPackage,
    variables: { input: dataPackage },
  });

  const packageId = response.data.createPackage.id;
  if (data.packageDiscounts.length) {
    for (let index = 0; index < data.packageDiscounts.length; index++) {
      const packageDiscount = {
        packageCouponDiscountPackageId: packageId,
        couponDiscountPackageCouponId: data.packageDiscounts[index].couponId,
        price: data.packageDiscounts[index].price,
        quantity: data.packageDiscounts[index].quantity,
        discount: data.packageDiscounts[index].discount,
        description: '',
      };

      //
      const couponDiscountPackage = await API.graphql({
        query: createCouponDiscountPackage,
        variables: { input: packageDiscount },
      });
      //
      const packageCouponDiscount = {
        couponID: data.packageDiscounts[index].couponId,
        couponDiscountPackageID:
          couponDiscountPackage.data.createCouponDiscountPackage.id,
      };
      await API.graphql({
        query: createPackageCouponDiscounts,
        variables: { input: packageCouponDiscount },
      });
    }
  }

  const item = await API.graphql({
    query: getPackage,
    variables: { id: packageId },
  });
  return item;
}
