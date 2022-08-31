import { API } from 'aws-amplify';
import { listSettings } from 'graphql/queries';

export default async function settingRepository(filter) {
  let dataSettings = [];
  await API.graphql({
    query: listSettings,
  })
    .then((res) => {
      dataSettings = res.data.listSettings.items;
    })
    .catch((e) => {});

  return dataSettings;
}
