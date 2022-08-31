import { API } from 'aws-amplify';
import { getPackage } from 'graphql/queries';
import {
  updatePackage,
  updateCouponDiscountPackage,
  createCouponDiscountPackage,
} from 'graphql/mutations';

export default async function updatePackageRepository(data) {
  const dataPackage = {
    id: data.id,
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    discount: data.discount,
    couponPackagesId: data.couponPackagesId,
    description: data.description,
  };

  await API.graphql({
    query: updatePackage,
    variables: { input: dataPackage },
  });

  if (data.packageDiscounts.length > 0) {
    for (let index = 0; index < data.packageDiscounts.length; index++) {
      let packageDiscount = {
        id: data.packageDiscounts[index].id,
        couponDiscountPackageCouponId: data.packageDiscounts[index].couponId,
        price: data.packageDiscounts[index].price,
        quantity: data.packageDiscounts[index].quantity,
        discount: data.packageDiscounts[index].discount,
        description: '',
      };

      if (packageDiscount.id === '') {
        delete packageDiscount.id;
        packageDiscount.packageCouponDiscountPackageId = data.id;
        await API.graphql({
          query: createCouponDiscountPackage,
          variables: { input: packageDiscount },
        });
      } else {
        await API.graphql({
          query: updateCouponDiscountPackage,
          variables: { input: packageDiscount },
        });
      }
    }
  }

  if (data.deletedPackageDiscounts.length > 0) {
    for (const deleteItem of data.deletedPackageDiscounts) {
      API.graphql({
        query: updateCouponDiscountPackage,
        variables: {
          input: {
            id: deleteItem,
            deletedAt: new Date().toISOString(),
          },
        },
      });
    }
  }

  let item = await API.graphql({
    query: getPackage,
    variables: { id: data.id },
  });

  const couponDiscountPackages =
    item.data.getPackage.couponDiscountPackage.items.filter(
      (filter) => filter.deletedAt === null
    );
  item.data.getPackage.couponDiscountPackage.items = couponDiscountPackages;

  return item;
}
