import { API } from 'aws-amplify';

export default async function removeUserFromGroupRepository(groupName, userId) {
  const apiName = 'group'; // replace this with your api name.
  const path = '/group'; //replace this with the path you have configured on your API
  const myInit = {
    body: {
      userId: userId,
      group: groupName,
    },
  };

  return API.del(apiName, path, myInit);
}
