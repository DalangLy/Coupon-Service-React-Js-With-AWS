import { API } from 'aws-amplify';
import { updateUser } from 'graphql/mutations';

export default async function updateUserRepository(user) {
  // let input = user;
  // delete input.createdAt;
  // delete input.updatedAt;
  // delete input.owner;

  let data = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    groups: user.groups,
    phone: user.phone,
    company: user.company === undefined ? '' : user.company,
    companyAddress: user.company === undefined ? '' : user.companyAddress,
    jobTitle: user.jobTitle === undefined ? '' : user.jobTitle,
  };

  const response = await API.graphql({
    query: updateUser,
    variables: { input: data },
  });

  return response;
}
