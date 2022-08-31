const { default: graphQLMatchMode } = require('./graphqlMatchMode');

const graphqlFilterModelWithDataTable = (dataFilter) => {
  let filters = {};
  if (dataFilter !== undefined) {
    let AND_CONDITION = {};

    for (const key in dataFilter.filters) {
      if (key !== 'global') {
        const condition = graphQLMatchMode(
          dataFilter.filters[key].constraints[0].matchMode
        );

        // First Condition
        let filterCondition = {};
        if (dataFilter.filters[key].constraints[0].matchMode.includes('date')) {
          let date = new Date(dataFilter.filters[key].constraints[0].value);
          const date1 = new Date(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} GMT`
          ).toISOString();
          // check if default null date that parsed to iso string equal 1970-01-01T00:00:00.000Z
          if (date1 !== new Date(null).toISOString()) {
            // check if date use equal condition
            if (condition === 'eq') {
              filters[key] = { gt: date1 };
              const date2 = new Date(date1).setHours(24, 0, 0, 0);
              AND_CONDITION[key] = { le: new Date(date2).toISOString() };
            } else {
              filterCondition[condition] = date1; // parser date
              filters[key] = filterCondition;
            }
          }
        } else if (dataFilter.filters[key].constraints[0].value !== null) {
          // const value1 = dataFilter.filters[key].constraints[0].value;

          filterCondition[condition] =
            dataFilter.filters[key].constraints[0].value;
          filters[key] = filterCondition;
        }

        // Second Condition
        if (Object.keys(dataFilter.filters[key].constraints).length > 1) {
          const condition2 = graphQLMatchMode(
            dataFilter.filters[key].constraints[1].matchMode
          );
          let filterCondition2 = {};
          filterCondition2[condition2] = new Date(
            dataFilter.filters[key].constraints[1].value
          ).toISOString();
          AND_CONDITION[key] = filterCondition2;
        }
      }
    }

    if (Object.keys(AND_CONDITION).length > 0) {
      filters['and'] = AND_CONDITION;
    }
  }
  return filters;
};

export default graphqlFilterModelWithDataTable;
