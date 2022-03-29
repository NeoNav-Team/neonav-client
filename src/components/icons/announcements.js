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

function Announcements(props) {
    const { fill } = props;
    return (
        <StyledLogoDiv fill={fill}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
           <path class="cls-1" d="M23.9,6.35a2.1,2.1,0,0,0-2.09-2.08H17.06a2.31,2.31,0,0,0-.37,0A3.31,3.31,0,0,1,17.9,6.84l0,7a2,2,0,0,1-.25,1,1.41,1.41,0,0,1,.4,1V19.6a1.43,1.43,0,0,1-1,1.37v.24a1.06,1.06,0,1,0,2.12,0V13a.23.23,0,0,1,.46,0v8.24a1.06,1.06,0,0,0,2.12,0l0-14.85a.18.18,0,0,1,.18-.18.19.19,0,0,1,.19.18h0l0,6.49a.89.89,0,0,0,.89.88h0a.88.88,0,0,0,.88-.89Z" transform="translate(-0.07 0)"/><path class="cls-1" d="M12.06,4a2,2,0,1,0-2-2h0A2,2,0,0,0,12.06,4Z" transform="translate(-0.07 0)"/><path class="cls-1" d="M19.44,3.69a1.84,1.84,0,1,0-1.83-1.83A1.83,1.83,0,0,0,19.44,3.69Z" transform="translate(-0.07 0)"/><path class="cls-1" d="M17.05,15.81a.39.39,0,0,0-.39-.4h-.17v-.79a.82.82,0,0,0,.24-.25h0a1,1,0,0,0,.16-.53h0l0-7a2.26,2.26,0,0,0-1.8-2.19,2.3,2.3,0,0,0-.45-.05h-.95l-1.2,3.12.28-1.31a.36.36,0,0,0,0-.27l-.38-.69.34-.62a.17.17,0,0,0,0-.14.15.15,0,0,0-.12-.07H11.6a.14.14,0,0,0-.11.07.14.14,0,0,0,0,.14l.34.62-.38.69a.36.36,0,0,0,0,.27l.24,1.31L10.46,4.6h-.32a2.12,2.12,0,0,0-2,1.4L7.78,7,7.19,4.93a.93.93,0,0,0-.45-.57V3.2h.35a.27.27,0,0,0,.28-.27V1.67a.27.27,0,0,0-.28-.27H5.4L4.19.61a.26.26,0,0,0-.28,0,.27.27,0,0,0-.15.24V3.76A.28.28,0,0,0,4.19,4L5.4,3.2h.3V4.43a1,1,0,0,0-.34,1L6.54,9.61a.94.94,0,0,0,.79.69,1,1,0,0,0,.94-.45A20.88,20.88,0,0,0,9.51,7.34v3.49h0v12A1.14,1.14,0,0,0,10.66,24h0a1.15,1.15,0,0,0,1.14-1.14V14a.25.25,0,1,1,.49,0v8.89a1.15,1.15,0,0,0,2.29,0v-2a1.45,1.45,0,0,1-.79-1.28V15.81a1.42,1.42,0,0,1,.79-1.28l0-7.67a.2.2,0,0,1,.39,0h0l0,7a.94.94,0,0,0,.16.52h0a.76.76,0,0,0,.23.24v.8h-.16a.4.4,0,0,0-.39.4V19.6a.4.4,0,0,0,.39.39h1.44a.39.39,0,0,0,.39-.39V15.81Z" transform="translate(-0.07 0)"/><path class="cls-1" d="M2.49,1.91h-2a.4.4,0,0,0-.39.39.39.39,0,0,0,.39.39h2a.38.38,0,0,0,.39-.39A.39.39,0,0,0,2.49,1.91Z" transform="translate(-0.07 0)"/><path class="cls-1" d="M.36.77l2,.52h.09A.38.38,0,0,0,2.87,1,.39.39,0,0,0,2.59.53L.56,0A.4.4,0,0,0,.08.29.39.39,0,0,0,.36.77Z" transform="translate(-0.07 0)"/><path class="cls-1" d="M2.4,3.31l-2,.52a.39.39,0,1,0,.2.76l2-.52a.39.39,0,0,0-.19-.76Z" transform="translate(-0.07 0)"/>
           </svg>
        </StyledLogoDiv>
    )
}
export default Announcements;