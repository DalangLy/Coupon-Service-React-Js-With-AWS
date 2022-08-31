import { API } from 'aws-amplify';
import { listCouponApplieds } from 'graphql/queries';

export default async function getCloseTicketStatisticRepository(date) {
  let percentage = 0;

  const yesterdayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1
  ).toISOString();
  const todayStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toISOString();
  const todayEnd = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  ).toISOString();

  //
  let yesterday = await API.graphql({
    query: listCouponApplieds,
    variables: {
      filter: {
        createdAt: { gt: yesterdayDate },
        and: {
          createdAt: {
            le: todayStart,
          },
        },
      },
    },
  });

  let today = await API.graphql({
    query: listCouponApplieds,
    variables: {
      filter: {
        createdAt: { gt: todayStart },
        and: {
          createdAt: {
            le: todayEnd,
          },
        },
      },
    },
  });

  yesterday = yesterday.data.listCouponApplieds.items.length;
  today = today.data.listCouponApplieds.items.length;

  const total = today - yesterday;
  const data = total / yesterday;
  if (data === Infinity) {
    percentage = total * 100;
  } else if (isNaN(data)) {
    percentage = 0;
  } else {
    percentage = (total / yesterday) * 100;
  }

  return {
    count: today,
    percentage: percentage.toFixed(2),
  };
}
