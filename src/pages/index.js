import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Layout from '../components/layout';
import Logout from '../components/icons/logout';
import { Layout as AntLayout, Row, Col } from 'antd';
import HeaderBar from '../components/headerBar';
import ButtonIcon from '../components/buttonIcon';

const StyledAntLayout = styled(AntLayout)`
  &.ant-layout{
    background: transparent;
  }
`;

export default function Home() {

  return (
    <Layout>
      <HeaderBar noMenu={true}>
          N  E O N A V
      </HeaderBar>
      <StyledAntLayout>
          <Row gutter={[24, 24]}>
            <Col span={6} >
              <ButtonIcon navTo='/logout'>
                <Logout />
              </ButtonIcon>
            </Col>
            <Col span={6} />
            <Col span={6} />
            <Col span={6} />
          </Row>
      </StyledAntLayout>
    </Layout>
  )
}
