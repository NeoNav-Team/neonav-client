import React from 'react';
import styled from 'styled-components';

const StyledLogoDiv  = styled.div`
margin: 0 auto;
cursor: pointer;
    & svg {
        position: relative;
        wisth: 100%;
        height: 100%;
        fill: #fff;
        filter: drop-shadow(0 0 5px #fff);
        &:hover {
            filter: drop-shadow(0 0 10px #fff);
        }
    }
`;

function UserSettings(props) {
    return (
        <StyledLogoDiv>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
            </svg>
        </StyledLogoDiv>
    )
}
export default UserSettings;