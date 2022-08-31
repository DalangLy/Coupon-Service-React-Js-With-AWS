import Amplify, { API } from 'aws-amplify';
import awsconfig from '../aws-exports';

const awsConfig = Amplify.configure(awsconfig);

export default awsConfig;
