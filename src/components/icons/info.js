import React from 'react';
import styled from 'styled-components';

const StyledIconDiv = styled.div`
    margin: 0 auto;
    cursor: pointer;
    & svg {
        position: relative;
        width: 100%;
        height: 100%;
        fill: #fff;
        filter: drop-shadow(0 0 5px #fff);
        &:hover {
            filter: drop-shadow(0 0 10px #fff);
        }
    }
`;

function Info(props) {
    const {width, height} = props;
    return (
        <StyledIconDiv
            width={width || 0}
            height={height|| 0}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"  />
            </svg>
        </StyledIconDiv>
    )
}
export default Info;