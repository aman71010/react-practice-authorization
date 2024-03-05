import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if(!token) {
      return;
    }

    if(token === 'expire') {
      submit(null, {method: 'post', action: '/logout'});
    }

    const duration = getTokenDuration();
    setTimeout(() => {
      submit(null, {method: 'post', action: '/logout'});
    }, duration);
  }, [token, submit]);
  

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
