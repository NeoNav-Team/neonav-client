import React from 'react';
import styled from 'styled-components';


const StyledInputDiv  = styled.div`
    display: block;
    background: yellow;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    & button {
        height: 12vh;
        width: 12vh;
    }

`;

function ChatInputBar(props) {
    const { children } = props;

    return (
        <StyledInputDiv>
            {children}
        </StyledInputDiv>
    )
}
export default ChatInputBar;