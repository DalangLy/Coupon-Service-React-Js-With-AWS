import { API } from 'aws-amplify';

export default async function getUserRole(email) {
  const apiName = 'users'; // replace this with your api name.
  const path = '/users/auth'; //replace this with the path you have configured on your API
  const myInit = {
    body: {
      email: email,
    }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  return await API.post(apiName, path, myInit);
}
