import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

const StyledSpinnerDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

function PageSpinner(props) {
  return (
    <StyledSpinnerDiv>
        <Spin indicator={antIcon} />
    </StyledSpinnerDiv>
  )
}
export default PageSpinner;