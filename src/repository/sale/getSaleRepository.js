import { API, Auth } from 'aws-amplify';
import { listSaleCoupons } from 'graphql/queries';

export default async function getSaleRepository(
  filter = {},
  limit = 10,
  nextToken = null
) {
  const auth = await Auth.currentAuthenticatedUser();
  const group = auth.signInUserSession.accessToken.payload['cognito:groups'];
  let filters = filter ?? {};
  if (group.includes('Guests')) {
    filters['saleCouponOwnerId'] = { eq: auth.username };
  }

  const response = await API.graphql({
    query: listSaleCoupons,
    variables: {
      limit: limit,
      nextToken: nextToken,
      filter: filters,
    },
  });

  return response;
}
