import React from 'react';
import styled from 'styled-components';


const StyledInputDiv  = styled.div`
    display: block;
    background: rgba(0, 0, 255, .125);
    left: 0;
    min-height: 96px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    @media screen and (max-width: 900px) {
        min-height: 64px;
    }
    &.pitch-mixin {
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    }
`;

function ChatChannelMenu(props) {
    const { children } = props;

    return (
        <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x br-clip bl-clip border">
            {children}
        </StyledInputDiv>
    )
}
export default ChatChannelMenu;