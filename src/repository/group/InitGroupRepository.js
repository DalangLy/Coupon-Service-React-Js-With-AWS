import { API } from 'aws-amplify';

export default async function initGroupRepository() {
  return await API.post('group', '/group/create/', {});
}
