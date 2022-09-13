import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import MainBody from 'components/Main/MainBody';
import { ConfirmDialog } from 'primereact/confirmdialog';
// route
import appRoutes from 'routes/appRoute';

// views
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons } from 'reducers/couponReducer';
import { fetchPackages } from 'reducers/packageReducer';
import { fetchSales } from 'reducers/saleReducer';
import { fetchSettings } from 'reducers/settingReducer';
import NotFound from 'views/NotFound';
import AppHeader from 'components/Headers/AppHeader';
import AppNavBar from 'components/Navbars/AppNavBar';
import { Sidebar } from 'primereact/sidebar';
import AppNavMobileBar from 'components/Navbars/AppNavMobileBar';
import { fetchDashboardReport } from 'reducers/dashboardReducer';

export default function Admin() {
  const dispatch = useDispatch();
  const [collapseMenu, setCollapseMenu] = useState(false);
  const [collapseMenuMobile, setCollapseMenuMobile] = useState(false);
  const dashboardReducer = useSelector((state) => state.dashboard);
  const isLoadingCoupon = useSelector((state) => state.coupons.isLoading);
  const isLoadingPackage = useSelector((state) => state.packages.isLoading);
  const isLoadingSale = useSelector((state) => state.sales.isLoading);
  const setting = useSelector((state) => state.setting);
  const auth = useSelector((state) => state.auth);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    try {
      if (auth.userType.length > 0) {
        if (
          auth?.userType?.includes('Sales') ||
          auth?.userType?.includes('Administrators')
        ) {
          dispatch(fetchDashboardReport());
        }

        //

        if (isLoadingCoupon) dispatch(fetchCoupons());
        if (isLoadingPackage) dispatch(fetchPackages());
        if (isLoadingSale) dispatch(fetchSales());
        if (setting.loading) dispatch(fetchSettings());
      }
    } catch (e) {}

    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='min-h-screen bg-slate-100'>
      <ConfirmDialog
        visible={auth.userType.length === 0}
        message='Please contact administrator!'
        header='Unauthorized'
        icon='pi pi-exclamation-triangle'
        accept={() => {}}
        acceptLabel='Confirm'
        rejectClassName='display-none'
      />

      <AppHeader
        notificationCount={dashboardReducer.notificationsCount}
        collapseMenu={() => {
          if (width > 900) {
            setCollapseMenu(!collapseMenu);
          } else {
            setCollapseMenuMobile(!collapseMenuMobile);
          }
        }}
      />
      <section className='py-3'>
        <AppNavBar
          groups={auth?.userType}
          className={`float-left w-2/12 nav-menu rounded-lg ${
            collapseMenu ? 'nav-menu-hide ' : ''
          }`}
        />

        <Sidebar
          visible={collapseMenuMobile}
          onHide={() => setCollapseMenuMobile(false)}
        >
          <AppNavMobileBar groups={auth?.userType} />
        </Sidebar>

        <MainBody collapseMenu={collapseMenu}>
          {auth.userType.length > 0 ? (
            <Switch>
              {appRoutes(auth.userType).map((route, i) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={route.component}
                />
              ))}
              <Route exact component={NotFound} />
            </Switch>
          ) : null}
        </MainBody>
      </section>
    </div>
  );
}
