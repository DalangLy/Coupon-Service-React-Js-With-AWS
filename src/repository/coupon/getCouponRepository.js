import { API } from 'aws-amplify';
import { listCoupons } from 'graphql/queries';

export default async function getCouponRepository(
  filter = {},
  limit = 10,
  nextToken = null
) {
  const dataFilter = {
    ...filter,
    deletedAt: { attributeExists: false },
  };

  const response = await API.graphql({
    query: listCoupons,
    variables: {
      filter: dataFilter,
      limit,
      nextToken,
    },
  });

  return response;
}
