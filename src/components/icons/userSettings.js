import React from 'react';
import styled from 'styled-components';

const StyledLogoDiv  = styled.div`
    margin: 0 auto;
    cursor: pointer;
    & svg {
        position: relative;
        width: 100%;
        height: 100%;
        fill: #42c6ff;
        filter: drop-shadow(0 0 5px #42c6ff);
        &:hover {
            filter: drop-shadow(0 0 10px #42c6ff);
        }
    }
`;

function UserSettings(props) {
    const {width, height} = props;
    return (
        <StyledLogoDiv>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		        <path d="M13,8.6c-0.8,0-1.4,0.6-1.4,1.4s0.6,1.4,1.4,1.4s1.4-0.6,1.4-1.4S13.8,8.6,13,8.6z" />
		        <path d="M13,3C9.2,3,6.2,5.9,6,9.6l-1.9,2.6c-0.2,0.3,0,0.8,0.4,0.8H6v3c0,1.1,0.9,2,2,2h1v3h7v-4.7c2.4-1.1,4-3.5,4-6.3,C20,6.1,16.9,3,13,3z M16,10c0,0.1,0,0.3,0,0.4l0.8,0.7c0.1,0.1,0.1,0.2,0,0.2l-0.8,1.4c0,0.1-0.2,0.1-0.2,0.1l-1-0.4,c-0.2,0.2-0.4,0.3-0.7,0.4L14,13.8c0,0.1-0.1,0.2-0.2,0.2h-1.6c-0.1,0-0.2-0.1-0.2-0.2l-0.1-1.1c-0.2-0.1-0.5-0.2-0.7-0.4l-1,0.4,c-0.1,0-0.2,0-0.2-0.1l-0.8-1.4c-0.1-0.1,0-0.2,0.1-0.2l0.8-0.7c0-0.1,0-0.3,0-0.4s0-0.3,0-0.4L9.2,8.9C9.1,8.9,9.1,8.8,9.1,8.7,l0.8-1.4c0.1-0.1,0.1-0.1,0.2-0.1l1,0.4c0.2-0.2,0.4-0.3,0.7-0.4L12,6.2C12,6.1,12.1,6,12.2,6h1.6C13.9,6,14,6.1,14,6.2l0.1,1.1,c0.2,0.1,0.5,0.2,0.7,0.4l1-0.4c0.1,0,0.2,0,0.2,0.1l0.8,1.4c0,0.1,0,0.2,0,0.3L16,9.6C16,9.7,16,9.9,16,10z" />
            </svg>
        </StyledLogoDiv>
    )
}
export default UserSettings;