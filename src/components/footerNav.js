import React from 'react';
import styled from 'styled-components';
import UserSettings from './icons/userSettings';
import ButtonIcon from './buttonIcon';

const StyledPaneDiv  = styled.div`
    position: absolute;
    background: #090F44;
    border: 1px solid #41C5FF;
    filter: drop-shadow(0 0 10px #41C5FF);
    bottom: 4px;
    height: 12vh;
    width: 100%;
    text-align: center;
    border-radius: 50px 50px 10px 10px;
    & button {
        height: 12vh;
        width: 12vh;
    }
`;

function FooterNav(props) {
    const { children } = props;

    return (
        <StyledPaneDiv>
            <ButtonIcon
                navTo={'/profile'}
            >
                <UserSettings />
            </ButtonIcon>
            {children}
        </StyledPaneDiv>
    )
}
export default FooterNav;