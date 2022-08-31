import GroupPage from 'views/admin/Groups/GroupPage';
import ShowGroup from 'views/admin/Groups/ShowGroup';
import NotFound from 'views/NotFound';

const groupRoute = (groups) => {
  return [
    {
      path: '/admin/groups',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? GroupPage
          : NotFound,
    },
    {
      path: '/admin/groups/:id',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? ShowGroup
          : NotFound,
    },
  ];
};
export default groupRoute;
