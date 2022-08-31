import { API } from 'aws-amplify';
import { updateSetting } from 'graphql/mutations';
import { createSetting } from 'graphql/mutations';
import { listSettings } from 'graphql/queries';

export default async function createSettingRepository(name, data) {
  const body = JSON.stringify(JSON.stringify(data));

  const findExistingSetting = await API.graphql({
    query: listSettings,
    variables: {
      filter: {
        name: { eq: name },
      },
    },
  });

  if (findExistingSetting.data.listSettings.items.length > 0) {
    await API.graphql({
      query: updateSetting,
      variables: {
        input: {
          id: findExistingSetting.data.listSettings.items[0].id,
          body: body,
        },
      },
    }).catch((e) => {
      throw e;
    });
  } else {
    await API.graphql({
      query: createSetting,
      variables: {
        input: {
          name: name,
          body: body,
        },
      },
    }).catch((e) => {
      throw e;
    });
  }

  return [];
}
