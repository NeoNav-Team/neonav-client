import React from 'react';
import styled from 'styled-components';
import useDimensions from 'react-use-dimensions';
import UserSettings from './icons/userSettings';

const StyledPaneDiv  = styled.div`
    position: absolute;
    background: #090F44;
    border: 1px solid #41C5FF;
    filter: drop-shadow(0 0 10px #41C5FF);
    bottom: 4px;
    height: ${props => props.panelHeight};
    width: 100%;
    text-align: center;
    border-radius: 50px 50px 10px 10px;
`;

function FooterNav(props) {
    const [ref, { width }] = useDimensions();
    const { children } = props;
    const iconSize = width / 5;

    const navtoPanel = route => {

    };
 
    return (
        <StyledPaneDiv ref={ref} panelHeight={`${iconSize}px`}>
            <UserSettings
                width={iconSize}
                height={iconSize}
                onClick={navtoPanel}
            />
            {children}
        </StyledPaneDiv>
    )
}
export default FooterNav;