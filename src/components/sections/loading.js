import React from 'react';
import Layout from '../components/layout';
import PageSpinner from '../components/pageSpinner';

export default function Loading() {

  return (
    <Layout>
        <PageSpinner />
    </Layout>
  )
}
