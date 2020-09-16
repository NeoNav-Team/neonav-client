import React from 'react';
import styled from 'styled-components';

const StyledPaneDiv  = styled.div`
    background: #090F44;
    border: 1px solid #41C5FF;
    filter: drop-shadow(0 0 10px #41C5FF);
    width: 100%;
    text-align: center;
    border-radius: 50px 50px 10px 10px;
`;

function Profile(props) {
  return (
    <StyledPaneDiv>
       <H1></H1>
    </StyledPaneDiv>
  )
}
export default Profile;