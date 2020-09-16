import React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import { logout } from '../services/auth';

export default function Home() {

  const handeLogout = event => {
    logout(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <Layout>
        <h1 style={{color: 'white'}}>Logged in yo!!</h1>
        <button onClick={handeLogout}>logout</button>
    </Layout>
  )
}
