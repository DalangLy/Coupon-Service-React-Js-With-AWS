import { API } from 'aws-amplify';
import initGroupRepository from './InitGroupRepository';

export default async function getListGroupRepository() {
  const response = await API.get('group', '/group', {});

  if (response.success) {
    if (response.data.length === 0) {
      await initGroupRepository();
    }
  }

  return response;
}
