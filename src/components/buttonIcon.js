import React from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import { logout } from '../services/auth';
import styled from 'styled-components';

const StyledButton  = styled.button`
    background-color: transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    &:disabled {
        opacity:.5
        pointer-events: none;
    }
`;

function ButtonIcon(props) {
    const { navTo, children } = props;
    const navtoPage = route => {
        if (route === '/logout') {
            logout(() => {
                navigate('/', { replace: true });
            });
        } else {
            navigate(route, { replace: true });
        }
    };

  return (
    <StyledButton
        onClick={navTo && _.partial(navtoPage, navTo)}
    >
        {children}
    </StyledButton>
  )
}
export default ButtonIcon;