import Coupons from 'views/admin/Coupons/Coupons';
import CreateCoupon from 'views/admin/Coupons/CreateCoupon';
import EditCoupon from 'views/admin/Coupons/EditCoupon';
import ShowCoupon from 'views/admin/Coupons/ShowCoupon';
import NotFound from 'views/NotFound';

const couponRoute = (groups) => {
  return [
    {
      path: '/admin/coupons',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? Coupons
          : NotFound,
    },
    {
      isWrite: true,
      path: '/admin/coupons/create',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? CreateCoupon
          : NotFound,
    },
    {
      isWrite: true,
      path: '/admin/coupons/edit/:id',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? EditCoupon
          : NotFound,
    },
    {
      path: '/admin/coupons/:id',
      component:
        groups.includes('Sales') || groups.includes('Administrators')
          ? ShowCoupon
          : NotFound,
    },
  ];
};

export default couponRoute;
