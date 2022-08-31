import { API } from 'aws-amplify';
import { getCouponSerialCode } from 'graphql/queries';

export default async function findSerialCouponRepository(id) {
  const serial = await API.graphql({
    query: getCouponSerialCode,
    variables: {
      id: id,
    },
  });
}
