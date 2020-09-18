import React, { useEffect }from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import PrivateRoute from '../components/privateRoute';
import Home from '../components/sections/home';
import Security from '../components/sections/security';
import Profile from '../components/sections/profile'; 
import FooterNav from '../components/footerNav';
import HeaderBar from '../components/headerBar'

export default function Index({ location }) {
  const isHome = location && location.pathname === "/";
  useEffect(() => {}, [location]);
  return (
    <Layout>
      <HeaderBar noMenu={isHome}>
            N E O N A V
      </HeaderBar>
      <Router basepath="/">
          <PrivateRoute location={location} path="/" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/security" component={Security} />
      </Router>
      <FooterNav />
    </Layout>
  )
}
