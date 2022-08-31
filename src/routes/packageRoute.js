import Packages from 'views/admin/Packages/Packages';
import CreatePackage from 'views/admin/Packages/CreatePackage';
import EditPackage from 'views/admin/Packages/EditPackage';
import ShowPackage from 'views/admin/Packages/ShowPackage';
import NotFound from 'views/NotFound';

const packageRoute = (groups) => {
  return [
    {
      path: '/admin/packages',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? Packages
          : NotFound,
    },
    {
      isWrite: true,

      path: '/admin/packages/create',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? CreatePackage
          : NotFound,
    },
    {
      isWrite: true,

      path: '/admin/packages/edit/:id',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? EditPackage
          : NotFound,
    },
    {
      path: '/admin/packages/:id',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? ShowPackage
          : NotFound,
    },
  ];
};
export default packageRoute;
