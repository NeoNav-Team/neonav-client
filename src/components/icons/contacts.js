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

function Contacts(props) {
    const {fill} = props;
    return (
        <StyledIconDiv
            fill={fill}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M.11,15.78a7.65,7.65,0,0,1,.3-1,3.32,3.32,0,0,1,2.92-2c.66,0,1.33,0,2,0a.56.56,0,0,1,0,.13,5.68,5.68,0,0,0-.26,1.92c0,2,0,4,0,6,0,.41,0,.82,0,1.25H5.07c-1,0-2,0-2.94,0a2,2,0,0,1-2-1.65.49.49,0,0,0,0-.11Z"/>
                <path d="M12,22H7.3c-.61,0-.84-.24-.84-.84,0-2.32,0-4.65,0-7a3.41,3.41,0,0,1,2.78-3.18A4.6,4.6,0,0,1,9.89,11c1.47,0,2.94,0,4.4,0a3.41,3.41,0,0,1,3.15,2.78,5.25,5.25,0,0,1,.06.79v6.6c0,.63-.23.86-.87.86Z"/>
                <path d="M12,1.91A4.12,4.12,0,1,1,7.86,6,4.12,4.12,0,0,1,12,1.91Z"/>
                <path d="M18.8,22c0-.4.07-.77.07-1.13V15.76a8,8,0,0,0-.28-2.93s0-.05.05-.05a11.1,11.1,0,0,1,2.7.13,3.41,3.41,0,0,1,2.5,3.19q0,1.93,0,3.87a2,2,0,0,1-2,2.06C20.82,22.06,19.8,22,18.8,22Z"/>
                <path d="M4.73,5.75A3.09,3.09,0,1,1,1.65,8.84,3.1,3.1,0,0,1,4.73,5.75Z"/>
                <path d="M16.13,8.82a3.09,3.09,0,1,1,3.09,3.1A3.09,3.09,0,0,1,16.13,8.82Z"/>
            </svg>
        </StyledIconDiv>
    )
}
export default Contacts;