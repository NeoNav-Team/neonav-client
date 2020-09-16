import React from 'react';
import styled from 'styled-components';

const StyledPaneDiv = styled.div`
  background: transparent;
  margin: 0 auto;
  filter: drop-shadow(3px 3px 15px #fe75fe);
  padding: 1.5vh;
  .pitch-mixin {
    --aug-tr: 25px;
    --aug-b-extend1: 50%;

    --aug-border-all: 2px;
    --aug-border-bg: radial-gradient(#ff00a0, #fe75fe) 50% 50% / 100% 100%;
    
    --aug-inlay-all: 8px;
    --aug-inlay-bg: radial-gradient(#7a04eb, #120458)  50% 50% / 100% 100%;
    --aug-inlay-opacity: 0.5;
  }
`;
const Content = styled.div`
  padding: 4vh;
`;

function Pane(props) {
  const { children } = props;
  return (
    <StyledPaneDiv>
      <div className="pitch-mixin" data-augmented-ui={'tl-clip tr-clip-x br-clip b-scoop bl-clip both'}>
        <Content>
          {children}
        </Content>
      </div>
    </StyledPaneDiv>
  )
}
export default Pane;