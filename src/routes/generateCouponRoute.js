import GenerateCoupon from 'views/admin/GenerateCoupons/GenerateCoupons';
import CreateGenerateCoupon from 'views/admin/GenerateCoupons/CreateGenerateCoupon';
import EditGenerateCoupon from 'views/admin/GenerateCoupons/EditGenerateCoupon';
import ShowGenerateCoupon from 'views/admin/GenerateCoupons/ShowGenerateCoupon';
import NotFound from 'views/NotFound';

const generateCouponRoute = (groups) => {
  return [
    {
      path: '/admin/generate-coupon',
      component:
        groups.includes('Sales') ||
        groups.includes('Administrators') ||
        groups.includes('Guests')
          ? GenerateCoupon
          : NotFound,
    },
    {
      path: '/admin/generate-coupon/create',
      component:
        groups.includes('Sales') ||
        groups.includes('Administrators') ||
        groups.includes('Guests')
          ? CreateGenerateCoupon
          : NotFound,
    },
    {
      path: '/admin/generate-coupon/edit/:id',
      component:
        groups.includes('Sales') ||
        groups.includes('Administrators') ||
        groups.includes('Guests')
          ? EditGenerateCoupon
          : NotFound,
    },
    {
      path: '/admin/sales/:id',
      component:
        groups.includes('Sales') ||
        groups.includes('Administrators') ||
        groups.includes('Guests')
          ? ShowGenerateCoupon
          : NotFound,
    },
  ];
};

export default generateCouponRoute;
