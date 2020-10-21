import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const StyledWrapperDiv  = styled.div`
    display: block;
    color: white;
    min-height: ${props => props.height}px;
    max-height: ${props => props.height}px;
    width: 100%;
    text-align: left;
    overflow: auto;
`;

function ChatInfiniteDisplay(props) {
    const { children, height } = props;
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }

    useEffect(scrollToBottom, [children]);

    return (
        <StyledWrapperDiv height={height}>
            {children}
            <div ref={messagesEndRef} />
        </StyledWrapperDiv>
    )
}
export default ChatInfiniteDisplay;