import { API, Auth } from 'aws-amplify';
import { listCouponApplieds } from 'graphql/queries';

export default async function getCloseTicketReportRepository(
  filters,
  limit,
  nextToken
) {
  const auth = await Auth.currentAuthenticatedUser();
  const group = auth.signInUserSession.accessToken.payload['cognito:groups'];

  //
  let dataFilters = structuredClone(filters);

  let response;
  if (group !== undefined) {
    dataFilters['couponAppliedResolverId'] = { eq: auth.username, };
    if (group.includes('Supports')) {
      response = await API.graphql({
        query: listCouponApplieds,
        variables: {
          filter: dataFilters,
        },
      });
    } else if (group.includes('Guests')) {
      dataFilters['couponAppliedApplierId'] = { eq: auth.username };
      response = await API.graphql({
        query: listCouponApplieds,
        variables: {
          filter: dataFilters,
          limit,
          nextToken,
        },
      });
    } else if (
      group.includes('Administrators') ||
      group.includes('Sales') ||
      group.includes('Finances')
    ) {
      delete dataFilters.couponAppliedResolverId;
      delete dataFilters.couponAppliedApplierId;
      response = await API.graphql({
        query: listCouponApplieds,
        variables: {
          filter: dataFilters,
          limit,
          nextToken,
        },
      });
    } else {
      return [];
    }
  }

  return response === undefined ? [] :  response.data.listCouponApplieds;
}
