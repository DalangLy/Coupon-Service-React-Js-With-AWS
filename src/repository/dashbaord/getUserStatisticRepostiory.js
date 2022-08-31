import { API } from 'aws-amplify';
import { listUsers } from 'graphql/queries';

export default async function getUserStatisticRepository(date) {
  let percentage = 0;

  //  USER
  var firstDayOfWeek = date.getDate() - date.getDay();
  var lastDayOfWeek = firstDayOfWeek + 7;

  const firstDateOfWeek = new Date(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setDate(firstDayOfWeek)
  ).toISOString();
  const lastDateOfWeek = new Date(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setDate(lastDayOfWeek)
  ).toISOString();
  var lastWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    firstDayOfWeek - 7
  ).toISOString();

  let currentUserThisWeek = await API.graphql({
    query: listUsers,
    variables: {
      filter: {
        createdAt: { gt: firstDateOfWeek },
        and: { createdAt: { lt: lastDateOfWeek } },
      },
    },
  });

  let userSinceLastWeek = await API.graphql({
    query: listUsers,
    variables: {
      filter: {
        createdAt: { gt: lastWeek },
        and: { createdAt: { lt: firstDateOfWeek } },
      },
    },
  });
  currentUserThisWeek = currentUserThisWeek.data.listUsers.items.length;
  userSinceLastWeek = userSinceLastWeek.data.listUsers.items.length;

  let totalUser = currentUserThisWeek - userSinceLastWeek;
  const data = totalUser / userSinceLastWeek;

  if (data === Infinity) {
    percentage = totalUser * 100;
  } else if (isNaN(data)) {
    percentage = 0;
  } else {
    percentage = (totalUser / userSinceLastWeek) * 100;
  }

  return {
    count: currentUserThisWeek,
    percentage: percentage.toFixed(2),
  };
}
