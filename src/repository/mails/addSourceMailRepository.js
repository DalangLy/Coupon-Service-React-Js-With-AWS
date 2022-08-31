import { API } from 'aws-amplify';

export default async function addSourceEmailRepository(email) {
  return await API.post('sendMail', '/sendMail/add-source-email', {
    body: {
      email: email,
    },
  });
}
