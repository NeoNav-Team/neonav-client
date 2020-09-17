import React from 'react';
import styled from 'styled-components';
import UserSettings from './icons/userSettings';
import ButtonIcon from './buttonIcon';
import FixedBottom from 'react-fixed-bottom';

const StyledFooterDiv  = styled(FixedBottom)`
    display: block;
    background: transparent;
    height: 12vh;
    width: 100%;
    text-align: center;
    overflow: hidden;
    & button {
        height: 12vh;
        width: 12vh;
    }
    .grid-container { width: 100%; position: absolute; bottom: 0; left: 0; }

    .grid-container:after { 
        -webkit-mask-image: -webkit-gradient(linear, left 90%, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
        mask-image: gradient(linear, left 90%, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
            transform: perspective(200px) rotateX(40deg) scale(2,1) translateZ(0);
        content: ""; display: block; position: absolute; bottom: 0; left: 0; right: 0; width: 100%; height: 30vh;
        padding: 1px; 
        -webkit-background-clip: content-box; 
        -webkit-backface-visibility: hidden;
        outline: 1px solid transparent;
        transform-origin: bottom center;
        will-change: transform; 
        background-position: center bottom;
        background-size: 40px 40px;
        background-image: 
        linear-gradient(to right, #7a04eb 2px, transparent 2px), 
        linear-gradient(to bottom, #7a04eb 1px, transparent 2px);
    }
`;

function FooterNav(props) {
    const { children } = props;

    return (
        <StyledFooterDiv>
            <div className="grid-container" />
                <ButtonIcon
                    navTo={'/profile'}
                >
                    <UserSettings />
                </ButtonIcon>
                {children}
        </StyledFooterDiv>
    )
}
export default FooterNav;