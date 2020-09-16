import React from 'react';
import styled from 'styled-components';

const StyledPaneDiv  = styled.div`
    #090F44
`;

function Pane(props) {
  return (
    <StyledPaneDiv>
        {children}
    </StyledPaneDiv>
  )
}
export default Pane;