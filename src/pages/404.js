import React from 'react';
import Layout from '../components/layout'
import styled from 'styled-components';

const BigText = styled.h1`
  font-size: 30vh;
  position: absolute;
  left: 50%;
  top: 50%;
  color: #41C5FF;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 10px #41C5FF);
`;

export default function _404_() {
  return (
    <Layout>
      <>
        <BigText>404</BigText>
      </>
    </Layout>
  )
}
