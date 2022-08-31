import { API } from 'aws-amplify';
import { getUser } from 'graphql/queries';

export default async function findUserRepository(id) {
  try {
    const users = await API.graphql({
      query: getUser,
      variables: {
        id: id,
      },
    });
    return users.data.getUser;
  } catch (e) {
    return [];
  }
}
