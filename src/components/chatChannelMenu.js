import React from 'react';
import styled from 'styled-components';


const StyledInputDiv  = styled.div`
    display: block;
    left: 0;
    min-height: 96px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    padding: 10px;
    background: transparent;
    @media screen and (max-width: 900px) {
        min-height: 64px;
    }
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    }
`;

function ChatChannelMenu(props) {
    const { children } = props;

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x br-clip bl-clip both">
                {children}
            </StyledInputDiv>
        </div>
    )
}
export default ChatChannelMenu;