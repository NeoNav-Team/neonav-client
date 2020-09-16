import React from 'react';
import Layout from '../components/layout';
import HeaderBar from '../components/headerBar';

export default ({ pageContext: { profile } }) => {

  return (
    <Layout>
        <HeaderBar>
            Profile Page
        </HeaderBar>
        <p styles={{fontSize:'4rem'}}>{JSON.stringify(profile)}</p>
    </Layout>
  )
}
