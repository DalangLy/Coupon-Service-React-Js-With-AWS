import { API } from 'aws-amplify';
import { getSaleCoupon } from 'graphql/queries';

export default async function findSaleRepository(id) {
  const sale = await API.graphql({
    query: getSaleCoupon,
    variables: { id: id },
  });

  return sale.data?.getSaleCoupon;
}
