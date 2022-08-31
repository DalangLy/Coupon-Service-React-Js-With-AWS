import { API } from 'aws-amplify';
import { GenerateCouponStatus } from 'config/constants';
import { updateSaleCoupon } from 'graphql/mutations';

export default async function deleteSaleRepository(data) {
  const saleCoupon = {
    id: data.id,
    status: GenerateCouponStatus.REJECTED,
    deletedAt: new Date().toISOString(),
  };

  let response = await API.graphql({
    query: updateSaleCoupon,
    variables: { input: saleCoupon },
  });

  return response.data?.updateSaleCoupon;
}
