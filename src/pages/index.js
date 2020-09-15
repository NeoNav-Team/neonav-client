import React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import Logo from '../components/logo';
import FormLogin from '../components/formLogin';
import FooterNav from '../components/footerNav';
import { isLoggedIn, logout } from '../services/auth';

export default function Home() {

  const handeLogout = event => {
    logout(() => {
      navigate('/', { replace: true });
    });
  };
  const loggedIn = isLoggedIn();

  return (
    <Layout>
        {loggedIn ?
          <>
            <h1 style={{color: 'white'}}>Logged in yo!!</h1>
            <button onClick={handeLogout}>logout</button>
          </>
        :
          <>
            <Logo />
            <FormLogin />
          </>
        }
        {loggedIn && <FooterNav />}
    </Layout>
  )
}
