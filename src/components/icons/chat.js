import React from 'react';
import styled from 'styled-components';

const StyledIconDiv = styled.div`
    margin: 0 auto;
    cursor: pointer;
    & svg {
        position: relative;
        width: 100%;
        height: 100%;
        fill: ${props => props.fill ? props.fill : '#fff'};
        filter: drop-shadow(0 0 5px ${props => props.fill ? props.fill : '#fff'});
        &:hover {
            filter: drop-shadow(0 0 10px ${props => props.fill ? props.fill : '#fff'});
        }
    }
`;

function Chat(props) {
    const {fill} = props;
    return (
        <StyledIconDiv
            fill={fill}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z" />
            </svg>
        </StyledIconDiv>
    )
}
export default Chat;