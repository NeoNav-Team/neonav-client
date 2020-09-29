import React from 'react';
import styled from 'styled-components';


const StyledInputDiv  = styled.div`
    display: block;
    height: 48px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    & button {
        height: 12vh;
        width: 12vh;
    }
    &.pitch-mixin {
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    }
`;

function ChatInputBar(props) {
    const { children } = props;

    return (
        <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip-x tr-clipczx-x br-clip bl-clip border">
            {children}
        </StyledInputDiv>
    )
}
export default ChatInputBar;