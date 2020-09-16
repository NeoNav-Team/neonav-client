import React from 'react';
import styled from 'styled-components';

const StyledPaneDiv = styled.div`
  background: #090F44;
  margin: 0 auto;
  max-width: 500px;
  padding: 4vh;
  color: #fff;
  border: 1px solid #41C5FF;
  filter: drop-shadow(0 0 10px #41C5FF);
  border-radius: 5px;
  .ant-checkbox + span {
      color: #fff;
  }
  .ant-input, .ant-input-password {
      border-radius: 10px 0 10px 0;
  }
  .ant-btn {
      background: #41C5FF;
      filter: drop-shadow(0 0 5px #41C5FF);
      width: 80%;
      left: 50%;
      transform: translate(-50%, 0);
      height: 60px;
      border-radius: 20px 0 20px 0;
      font-size: 2rem;
  }
`;

function Pane(props) {
  const { children } = props;
  return (
    <StyledPaneDiv>
        {children}
    </StyledPaneDiv>
  )
}
export default Pane;