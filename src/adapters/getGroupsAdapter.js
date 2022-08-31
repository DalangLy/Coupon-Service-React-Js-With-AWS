import { API } from 'aws-amplify';

export default async function getGroupAdapter(query) {
  const response = await API.get('group', '/group', {
    queryStringParameters: {
      group: query,
    },
  }).catch((e) => {
    throw e;
  });

  return response;
}
