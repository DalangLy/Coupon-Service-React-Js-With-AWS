import { API } from 'aws-amplify';
import { listUsers } from 'graphql/queries';

export default async function getUserByGroupRepository(
  group,
  limit = 15,
  nextToken = null
) {
  try {
    const users = await API.graphql({
      query: listUsers,
      variables: {
        filter: {
          groups: { contains: group },
        },
        limit,
        nextToken,
      },
    });
    return users.data.listUsers;
  } catch (e) {
    return [];
  }
}
