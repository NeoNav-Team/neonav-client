import React from 'react';
import styled from 'styled-components';


const StyledInputDiv  = styled.div`
    display: block;
    background: blue;
    left: 0;
    height: 18vh;
    width: 100%;
    text-align: center;
    overflow: hidden;
`;

function ChatChannelMenu(props) {
    const { children } = props;

    return (
        <StyledInputDiv>
            {children}
        </StyledInputDiv>
    )
}
export default ChatChannelMenu;