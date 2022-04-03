import React from 'react';
import SpaceSuit from '../components/spaceSuit';
import Logo from '../components/logo';
import FormForgot from '../components/formForgot';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const StyledVertCenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Forgot({location}) {

  return (
    <SpaceSuit unlocked>
              <StyledVertCenteredDiv>
          <Row>
            <Col span={6} offset={9}>
              <Logo />
            </Col>
          </Row>
          <Row>
            <Col
              xs={{offset:0, span:24}}
              sm={{offset:0, span:24}}
              md={{offset:2, span:20}}
              lg={{offset:5, span:14}}
              xl={{offset:6, span:12}}
              >
              <FormForgot location={location} />
            </Col>
          </Row>
        </StyledVertCenteredDiv>
    </SpaceSuit>
  )
}