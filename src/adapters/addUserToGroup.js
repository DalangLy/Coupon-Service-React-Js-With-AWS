import { API } from 'aws-amplify';
import GroupStatement from 'config/constants/GroupStatement';

export default async function addUserToGroup(group, userId) {
  const apiName = 'group'; // replace this with your api name.
  const path = '/group'; //replace this with the path you have configured on your API
  const myInit = {
    body: {
      userId: userId,
      group:
        group === undefined || group === null ? GroupStatement.GUESTS : group,
    },
  };

  return API.post(apiName, path, myInit);
}
