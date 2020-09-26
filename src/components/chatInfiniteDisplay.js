import React from 'react';
import styled from 'styled-components';


const StyledWrapperDiv  = styled.div`
    display: block;
    background: red;
    color: green;
    height: 70vh;
    width: 100%;
    text-align: center;
    overflow: hidden;
`;

function ChatInfiniteDisplay(props) {
    const { children } = props;

    return (
        <StyledWrapperDiv>
            {children}
        </StyledWrapperDiv>
    )
}
export default ChatInfiniteDisplay;