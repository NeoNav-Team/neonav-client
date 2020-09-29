import React from 'react';
import styled from 'styled-components';


const StyledInputDiv  = styled.div`
    display: block;
    background: transparent;
    height: 48px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    & button {
        height: 12vh;
        width: 12vh;
    }
    &.pitch-mixin {
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    }
`;

function ChatInputBar(props) {
    const { children } = props;

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip-x tr-clipczx-x br-clip bl-clip both">
                {children}
            </StyledInputDiv>
        </div>
    )
}
export default ChatInputBar;