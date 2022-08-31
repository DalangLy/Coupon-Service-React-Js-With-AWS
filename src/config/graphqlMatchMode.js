const graphQLMatchMode = (matchMode) => {
  switch (matchMode) {
    case 'startsWith':
      return 'beginWith';
    case 'equals':
      return 'eq';
    case 'notEquals':
      return 'ne';
    case 'lt':
      return 'lt';
    case 'lte':
      return 'le';
    case 'gt':
      return 'gt';
    case 'gte':
      return 'ge';
    case 'between':
      return 'between';
    case 'dateIs':
      return 'eq';
    case 'dateIsNot':
      return 'ne';
    case 'dateAfter':
      return 'gt';
    case 'dateBefore':
      return 'lt';
    default:
      return 'contains';
  }
};

export default graphQLMatchMode;
