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

function TanChat(props) {
    const {fill} = props;
    return (
        <StyledIconDiv
            fill={fill}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M11.13,23.94,9.41,22.77l-.47-.32,3.4-4.83L9,15l1.64-2.1,3.2,2.55,2.68-3.82,2.18,1.53-.48.68-1.36,1.94s-.05.06,0,.11l1.1,1,0,0,3.81-4.21.21.19,1.69,1.5.08.05v0a.3.3,0,0,0-.08.08c-1.12,1.23-2.23,2.47-3.35,3.71l-.41.46,3,2.74-1.79,2-5.88-5.4,0,0-3.41,4.84c-.23.34-.46.68-.7,1Z" transform="translate(-0.18 -0.06)"/>
                <path d="M14.41,6.09,9.8,11.57l-2-1.75,3.47-4.13L8,2.15,10,.34l3,3.28L16,.06l2,1.75L16.13,4l1.3,1.24,4-4.24,1.95,1.84-4,4.21,3.28,3.08-1.84,1.93Z" transform="translate(-0.18 -0.06)"/>
                <path d="M3.79,9.19l-3.61-1L.86,5.68l.65.18L5.62,6.94A.19.19,0,0,1,5.74,7c.3.47.59.94.88,1.42a.29.29,0,0,1,0,.14C6.34,10,6,11.43,5.73,12.86c-.22,1-.45,2.05-.67,3.08-.28,1.31-.57,2.63-.85,4,0,.09,0,.18-.06.29l2.93-1.24,1,2.44-.44.19-4.74,2a.11.11,0,0,1-.13,0l-1.72-1.4A.14.14,0,0,1,1,22c.37-1.69.73-3.38,1.1-5.07.28-1.31.57-2.62.85-3.92s.55-2.54.82-3.8Z" transform="translate(-0.18 -0.06)"/><path d="M1.06,2.27,2.73.17,7.09,3.65,5.42,5.72Z" transform="translate(-0.18 -0.06)"/>
            </svg>
        </StyledIconDiv>
    )
}
export default TanChat;