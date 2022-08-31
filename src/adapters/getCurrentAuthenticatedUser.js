import { Auth } from 'aws-amplify';
import getListGroupRepository from 'repository/group/getListGroupRepository';

export default async function getCurrentAuthenticatedUser() {
  const authenticated = await Auth.currentAuthenticatedUser()
    .then(async (data) => {
      // await getListGroupRepository();

      return data;
    })
    .catch((e) => {
      throw e;
    });

  return authenticated;
}
