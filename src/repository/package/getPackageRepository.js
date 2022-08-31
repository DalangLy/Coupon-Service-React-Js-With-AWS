import { API } from 'aws-amplify';
import { listPackages } from 'graphql/queries';

export default async function getPackageRepository(
  filter = {},
  limit = 10,
  nextToken = null
) {
  const dataFilter = {
    ...filter,
    deletedAt: { attributeExists: false },
  };

  let response = await API.graphql({
    query: listPackages,
    variables: {
      filter: dataFilter,
      limit,
      nextToken,
    },
  });

  // for (const key in response.data.listPackages.items) {
  //   if (response.data.listPackages.items[
  //     key
  //   ]?.couponDiscountPackage?.items) {

  //   }
  //   const couponDiscountPackages = response.data.listPackages.items[
  //     key
  //   ]?.couponDiscountPackage.items.filter(
  //     (filter) => filter.deletedAt === null
  //   );
  //   response.data.listPackages.items[key].couponDiscountPackage.items =
  //     couponDiscountPackages;
  // }

  return response;
}
