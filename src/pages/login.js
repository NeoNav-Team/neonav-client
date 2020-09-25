import React from 'react';
import Layout from '../components/layout';
import Logo from '../components/logo';
import FormLogin from '../components/formLogin';

export default function Login({location}) {

  return (
    <Layout unlocked>
        <Logo />
        <FormLogin location={location} />
    </Layout>
  )
}
