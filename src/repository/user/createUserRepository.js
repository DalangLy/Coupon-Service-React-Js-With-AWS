import addUserToGroup from 'adapters/addUserToGroup';
import { API, Auth } from 'aws-amplify';
import { createUser } from 'graphql/mutations';

export default async function createUserRepository(user) {
  let newUser = {};
  try {
    await Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email, // optional
      },
    })
      .then(async (res) => {
        let data = {
          id: res.userSub,
          firstName: user.firstName,
          lastName: user.lastName,
          groups: user.groups,
          email: user.email,
          phone: user.phone,
          company: user.company === undefined ? '' : user.company,
          companyAddress:
            user.companyAddress === undefined ? '' : user.companyAddress,
          jobTitle: user.jobTitle === undefined ? '' : user.jobTitle,
        };

        await API.graphql({
          query: createUser,
          variables: { input: data },
        })
          .then((response) => {
            newUser = response.data.createUser;
          })
          .catch((e) => {
            throw e;
          });
        addUserToGroup(user.groups[0], data.id);
      })
      .catch((err) => {
        throw err;
      });

    return newUser;
  } catch (e) {
    throw e;
  }
}
