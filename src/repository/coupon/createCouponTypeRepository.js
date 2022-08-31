import { API, Auth } from 'aws-amplify';
import { createCoupon } from 'graphql/mutations';

export default async function createCouponRepository(data) {
  const auth = await Auth.currentAuthenticatedUser();
  const coupon = {
    ...data,
    couponCreatorId: auth.username,
  };

  const response = await API.graphql({
    query: createCoupon,
    variables: { input: coupon },
  });
  return response;
}
