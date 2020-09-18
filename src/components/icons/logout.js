import React from 'react';
import styled from 'styled-components';

const StyledLogoDiv  = styled.div`
    margin: 0 auto;
    cursor: pointer;
    & svg {
        position: relative;
        width: 80%;
        height: 80%;
        margin: 8% 10% 2%;
        fill: #fff;
        filter: drop-shadow(0 0 5px #fff);
        &:hover {
            filter: drop-shadow(0 0 10px #fff);
        }
    }
`;

function Logout(props) {
    const {width, height} = props;
    return (
        <StyledLogoDiv
            width={width || 0}
            height={height|| 0}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M13.34 8.17c-.93 0-1.69-.77-1.69-1.7a1.69 1.69 0 0 1 1.69-1.69c.94 0 1.7.76 1.7 1.69c0 .93-.76 1.7-1.7 1.7M10.3 19.93l-5.93-1.18l.34-1.7l4.15.85l1.35-6.86l-1.52.6v2.86H7v-3.96l4.4-1.87l.67-.08c.6 0 1.1.34 1.43.85l.86 1.35c.68 1.21 2.03 2.03 3.64 2.03v1.68c-1.86 0-3.56-.83-4.66-2.1l-.5 2.54l1.77 1.69V23h-1.69v-5.1l-1.78-1.69l-.84 3.72M21 23h-2V3H6v13.11l-2-.42V1h17v22M6 23H4v-3.22l2 .42V23z"/>
            </svg>
        </StyledLogoDiv>
    )
}
export default Logout;