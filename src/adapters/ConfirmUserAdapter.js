import { Auth } from 'aws-amplify';

export default async function ConfirmUserAdapter(email, code) {
  try {
    const user = await Auth.confirmSignUp(email, code);
  } catch (error) {
    console.log('error sign in:', error);
  }
}
