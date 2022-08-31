import { API } from 'aws-amplify';
import { updatePackage } from 'graphql/mutations';

export default async function deletePackageRepository(data) {
  const response = await API.graphql({
    query: updatePackage,
    variables: { input: { id: data.id, deletedAt: new Date().toISOString() } },
  });

  
  return response;
}
