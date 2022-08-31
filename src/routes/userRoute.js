import CreateUser from 'views/admin/Users/CreateUser';
import Users from 'views/admin/Users/Users';
import EditUser from 'views/admin/Users/EditUser';
import ShowUser from 'views/admin/Users/ShowUser';
import ResetPasswordUser from 'views/admin/Users/ResetPasswordUser';
import NotFound from 'views/NotFound';

const userRoute = (groups) => {
  return [
    {
      role: 'users',
      path: '/admin/users',
      component: !groups.includes('Guests') ? Users : NotFound,
    },
    {
      isWrite: true,
      role: 'users',
      path: '/admin/users/create',
      component: !groups.includes('Guests') ? CreateUser : NotFound,
    },
    {
      isWrite: true,
      role: 'users',
      path: '/admin/users/edit/:id',
      component: !groups.includes('Guests') ? EditUser : NotFound,
    },
    {
      role: 'users',
      path: '/admin/users/:id',
      component: !groups.includes('Guests') ? ShowUser : NotFound,
    },
    {
      path: '/admin/users/reset-password/:id',
      component: !groups.includes('Guests') ? ResetPasswordUser : NotFound,
    },
  ];
};

export default userRoute;
