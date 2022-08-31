import { API, Auth } from 'aws-amplify';
import GroupStatement from 'config/constants/GroupStatement';
import { createUser } from './../graphql/mutations';
import addUserToGroup from './addUserToGroup';
import getGroupAdapter from './getGroupsAdapter';
import SignInAdapter from './SignInAdapter';

export default async function SignUpAdapter(user, isRegister = true) {
  try {
    const auth = await Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email, // optional
        phone_number: '',
        'custom:user_type': 'Guests',
        'custom:phone': user.phone,
        'custom:firstName': user.firstName,
        'custom:lastName': user.lastName,
        'custom:companyName': user.company,
        'custom:address': user.address,
        'custom:forceResetPassword': new Date().toISOString(),
      },
    })
      .then(async (res) => {
        await SignInAdapter(user.email, user.password)
          .then(async (logged) => {
            const groups = await getGroupAdapter(GroupStatement.ADMINISTRATORS);
            const group =
              groups.data.Users.length === 0
                ? GroupStatement.ADMINISTRATORS
                : user.userType;

            let data = {
              id: logged.username,
              firstName: user.firstName,
              lastName: user.lastName,
              groups: [group],
              email: user.email,
              phone: user.phone,
              company: user.company,
              companyAddress: user.address,
            };
            await addUserToGroup(group, logged.username);
            await API.graphql({
              query: createUser,
              variables: { input: data },
            }).catch((e) => {
              throw e;
            });
          })
          .catch((e) => {
            console.log(e);
            throw e;
          });
      })
      .catch((err) => {
        throw err;
      });

    return auth;
  } catch (e) {
    throw e;
  }
}
