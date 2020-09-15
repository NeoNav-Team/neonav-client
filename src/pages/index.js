import React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import Logo from '../components/logo';
import FormLogin from '../components/formLogin';
import { isLoggedIn, logout } from '../services/auth';

export default function Home() {

  const handeLogout = event => {
    logout(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <Layout>
        {isLoggedIn() ?
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
    </Layout>
  )
}
