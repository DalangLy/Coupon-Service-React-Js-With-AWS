import { API, Auth } from 'aws-amplify';
import { listCouponSerialCodes } from 'graphql/queries';

export default async function SerialCouponReportRepository(
  filters,
  limit = null,
  nextToken
) {
  const auth = await Auth.currentAuthenticatedUser();
  const group = auth.signInUserSession.accessToken.payload['cognito:groups'];

  //
  let cloneFilters = structuredClone(filters);
  if (group !== undefined) {
    if (group.includes('Guests')) {
      cloneFilters['couponSerialCodeOwnerId'] = { eq: auth.username };
    } else if (
      group.includes('Administrators') ||
      group.includes('Sales') ||
      group.includes('Finances')
    ) {
      delete cloneFilters.couponSerialCodeOwnerId;
    } else {
      return [];
    }
    const response = await API.graphql({
      query: listCouponSerialCodes,
      variables: {
        filter: cloneFilters,
        nextToken,
        limit,
      },
    });

    return response.data.listCouponSerialCodes;
  } else {
    return [];
  }
}
