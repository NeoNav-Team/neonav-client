import React from 'react';
import styled from 'styled-components';

const StyledLogoDiv  = styled.div`
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

function Notify(props) {
    const { fill } = props;
    return (
        <StyledLogoDiv fill={fill}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path class="cls-1" d="M12,21a2.27,2.27,0,0,0,2.23-1.86H9.72A2.27,2.27,0,0,0,12,21Zm7.43-5.6c-.79-.78-1.77-1.17-1.77-5A5.67,5.67,0,0,0,12.88,4.8h-.14A1.06,1.06,0,0,0,12,3,1.06,1.06,0,0,0,10.9,4.08a1,1,0,0,0,.28.72H11a5.68,5.68,0,0,0-4.74,5.59c0,3.82-1,4.21-1.76,5a1.7,1.7,0,0,0,1.19,2.91H18.18A1.7,1.7,0,0,0,19.38,15.38ZM1.11,9.3A5.63,5.63,0,0,0,2.51,13l-.63.63A6.33,6.33,0,0,1,.21,9.33,6.22,6.22,0,0,1,1.9,5l.63.63A5.32,5.32,0,0,0,1.11,9.3Zm1.6,0a3.91,3.91,0,0,1,1-2.58l.64.63a3,3,0,0,0,0,3.86l-.64.63A3.75,3.75,0,0,1,2.71,9.33ZM21.47,5.67,22.1,5a6.2,6.2,0,0,1,1.69,4.29,6.33,6.33,0,0,1-1.67,4.3L21.49,13a5.64,5.64,0,0,0,1.4-3.7A5.32,5.32,0,0,0,21.47,5.67Zm-1.14,6.2-.63-.64a3,3,0,0,0,.69-1.93,3.06,3.06,0,0,0-.69-1.93l.63-.63a3.87,3.87,0,0,1,1,2.58A3.77,3.77,0,0,1,20.33,11.87Z"/>
            </svg>
        </StyledLogoDiv>
    )
}
export default Notify;