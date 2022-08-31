import { Auth } from 'aws-amplify';

export default async function SignInAdapter(username, password) {
  const user = await Auth.signIn(username, password).then((res) => {});
}
