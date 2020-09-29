import React from 'react';
import styled from 'styled-components';


const StyledWrapperDiv  = styled.div`
    display: block;
    color: green;
    min-height: ${props => props.height}px;
    width: 100%;
    text-align: center;
    overflow: hidden;
`;

function ChatInfiniteDisplay(props) {
    const { children, height } = props;

    return (
        <StyledWrapperDiv height={height}>
            {children}
        </StyledWrapperDiv>
    )
}
export default ChatInfiniteDisplay;