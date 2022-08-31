import { API } from 'aws-amplify';
import { listSaleCoupons } from 'graphql/queries';

export default async function getGenerateCouponStatisticRepository(date) {
  let percentage = 0;

  let filters = {
    saleCouponApproverId: { ne: null },
    deletedAt: { attributeExists: false },
  };

  const thisMonthFirstDay = new Date(
    new Date(date.getFullYear(), date.getMonth(), 1).setHours(0, 0, 0, 0)
  ).toISOString();
  const thisMonthLastDay = new Date(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(24, 0, 0, 0)
  ).toISOString();
  // last month
  const lastMonthFirstDay = new Date(
    new Date(date.getFullYear(), date.getMonth() - 1, 1).setHours(0, 0, 0, 0)
  ).toISOString();
  const lastMonthLastDay = new Date(
    new Date(date.getFullYear(), date.getMonth(), 0).setHours(24, 0, 0, 0)
  ).toISOString();

  //
  let generateCouponThisMonth = await API.graphql({
    query: listSaleCoupons,
    variables: {
      filter: {
        ...filters,
        createdAt: { gt: thisMonthFirstDay },
        and: {
          createdAt: {
            le: thisMonthLastDay,
          },
        },
      },
    },
  });

  let generateCouponLastMonth = await API.graphql({
    query: listSaleCoupons,
    variables: {
      filter: {
        ...filters,
        createdAt: { gt: lastMonthFirstDay },
        and: {
          createdAt: {
            le: lastMonthLastDay,
          },
        },
      },
    },
  });

  generateCouponThisMonth =
    generateCouponThisMonth.data.listSaleCoupons.items.length;
  generateCouponLastMonth =
    generateCouponLastMonth.data.listSaleCoupons.items.length;
  const total = generateCouponThisMonth - generateCouponLastMonth;
  const data = total / generateCouponLastMonth;
  if (data === Infinity) {
    percentage = total * 100;
  } else if (isNaN(data)) {
    percentage = 0;
  } else {
    percentage = (total / generateCouponLastMonth) * 100;
  }

  return {
    count: generateCouponThisMonth,
    percentage: percentage.toFixed(2),
  };
}
