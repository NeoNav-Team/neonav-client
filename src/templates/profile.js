import React from 'react';
import Layout from '../components/layout';
import HeaderBar from '../components/headerBar';

export default ({ pageContext: { profile } }) => {

  return (
    <Layout>
        <HeaderBar>
            Profile Page
        </HeaderBar>
        <p>{JSON.stringify(profile)}</p>
    </Layout>
  )
}
