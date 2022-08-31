import { API } from 'aws-amplify';
import { getPackage } from 'graphql/queries';

export default async function findPackageRepository(id) {
  let response = await API.graphql({
    query: getPackage,
    variables: {
      id: id,
    },
  });

  return response.data.getPackage;
}
