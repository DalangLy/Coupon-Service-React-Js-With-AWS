import { API } from 'aws-amplify';
import { updateCoupon } from 'graphql/mutations';

export default async function deleteCouponRepository(data) {
  const response = await API.graphql({
    query: updateCoupon,
    variables: { input: { id: data.id, deletedAt: new Date().toISOString() } },
  });
  return response;
}
