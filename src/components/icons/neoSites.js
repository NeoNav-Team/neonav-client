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

function NeoSites(props) {
    const {width, height} = props;
    return (
        <StyledIconDiv
            width={width || 0}
            height={height|| 0}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15,23H13V21H15V23M19,21H17V23H19V21M15,17H13V19H15V17M7,21H5V23H7V21M7,17H5V19H7V17M19,17H17V19H19V17M15,13H13V15H15V13M19,13H17V15H19V13M21,9A2,2 0 0,1 23,11V23H21V11H11V23H9V15H3V23H1V15A2,2 0 0,1 3,13H9V11A2,2 0 0,1 11,9V7A2,2 0 0,1 13,5H15V1H17V5H19A2,2 0 0,1 21,7V9M19,9V7H13V9H19Z"  />
            </svg>
        </StyledIconDiv>
    )
}
export default NeoSites;