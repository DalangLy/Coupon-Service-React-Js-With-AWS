import { API } from 'aws-amplify';

export default async function resetUserPasswordRepository(userId, password) {
  try {
    const init = {
      body: {
        userId,
        password,
      },
    };
    const response = await API.put('user', '/user/reset-password', init);
    return response;
  } catch (e) {
    throw e;
  }
}
