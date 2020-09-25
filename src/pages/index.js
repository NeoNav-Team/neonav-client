import React from 'react';
import queryString from 'query-string';
import Layout from '../components/layout';
import PrivateRoute from '../components/privateRoute';
import Home from '../components/sections/home';
import Security from '../components/sections/security';
import Profile from '../components/sections/profile'; 
import FooterNav from '../components/footerNav';
import HeaderBar from '../components/headerBar';

export default function Index({ location }) {
  const isHome = location && location.search.length <= 1;
  const params = queryString.parse(location.search);
  const p = !isHome && params.p;
  return (
    <Layout>
      <HeaderBar noMenu={isHome}>
            N E O N A V
      </HeaderBar>
          {isHome && <PrivateRoute location={location} component={Home} />}
          {p === 'profile' && <PrivateRoute location={location} component={Profile} />}
          {p === 'security' && <PrivateRoute location={location} component={Security} />}
      <FooterNav />
    </Layout>
  )
}
