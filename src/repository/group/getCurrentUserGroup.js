const { Auth } = require('aws-amplify');

const getCurrentUserGroup = async () => {
  const auth = await Auth.currentAuthenticatedUser();
  return auth.signInUserSession.accessToken.payload['cognito:groups'];
};

export default getCurrentUserGroup;
