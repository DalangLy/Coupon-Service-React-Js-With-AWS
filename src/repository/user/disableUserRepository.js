import { API } from 'aws-amplify';

import { updateUser } from 'graphql/mutations';

export default async function disableUserRepository(user) {
  const body = structuredClone(user);
  delete body.owner;
  delete body.name;
  delete body.status;
  const apiName = 'user'; // replace this with your api name.
  const myInit = {
    body: {
      userId: body.id,
    },
  };
  API.graphql({
    query: updateUser,
    variables: { input: body },
  });

  if (body.deletedAt === null) {
    return await API.del(apiName, '/user/enable', myInit);
  } else {
    return await API.del(apiName, '/user/disable', myInit);
  }
}
