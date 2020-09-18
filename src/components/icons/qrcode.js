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

function Qrcode(props) {
    const {fill} = props;
    return (
        <StyledIconDiv
            fill={fill}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3,11h8V3H3V11z M5,5h4v4H5V5z"/>
                <path d="M3,21h8v-8H3V21z M5,15h4v4H5V15z"/>
                <path d="M13,3v8h8V3H13z M19,9h-4V5h4V9z"/>
                <rect height="2" width="2" x="19" y="19"/>
                <rect height="2" width="2" x="13" y="13"/>
                <rect height="2" width="2" x="15" y="15"/>
                <rect height="2" width="2" x="13" y="17"/>
                <rect height="2" width="2" x="15" y="19"/>
                <rect height="2" width="2" x="17" y="17"/>
                <rect height="2" width="2" x="17" y="13"/>
                <rect height="2" width="2" x="19" y="15"/>           
            </svg>
        </StyledIconDiv>
    )
}
export default Qrcode;