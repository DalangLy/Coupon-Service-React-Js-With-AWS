import { API, Auth } from 'aws-amplify';
import { listUsers } from 'graphql/queries';
import getCurrentUserGroup from 'repository/group/getCurrentUserGroup';

export default async function userRepository(
  filter = {},
  limit = 10,
  nextToken = null
) {
  try {
    let userGroup = await getCurrentUserGroup();

    let users = await API.graphql({
      query: listUsers,
      variables: {
        filter: {},
        limit,
        nextToken,
      },
    });

    let data = users.data.listUsers;
    if (userGroup.includes('Finances')) {
      data.items = data?.items.filter((e) => e?.groups?.includes('Finances'));
    }

    if (userGroup.includes('Supports')) {
      data.items = data?.items.filter(
        (e) => e?.groups?.includes('Guests') || e?.groups?.includes('Supports')
      );
    }

    if (userGroup.includes('Sales')) {
      data.items = data?.items.filter(
        (e) => e?.groups?.includes('Guests') || e?.groups?.includes('Sales')
      );
    }

    return data;
  } catch (e) {
    return [];
  }
}
