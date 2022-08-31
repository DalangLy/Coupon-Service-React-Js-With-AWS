import { API } from 'aws-amplify';
import { updateCoupon } from 'graphql/mutations';

export default async function updateCouponRepository(data) {
  const response = await API.graphql({
    query: updateCoupon,
    variables: { input: data },
  });
  return response;
}
