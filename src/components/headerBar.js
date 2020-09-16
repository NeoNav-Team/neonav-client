import React from 'react';
import styled from 'styled-components';
import AppMenu from './icons/appMenu';
import ButtonIcon from './buttonIcon';

const Title  = styled.h1`
    color: #fff;
    line-height: 10vh;
    filter: drop-shadow(0 0 5px #fff);
    width: calc(100% - 10vh);
`;

const RightMenu  = styled.div`
  position: absolute;
  right: 0;
  top:0;
  svg {
      height: 10vh;
  }
`;

function HeaderBar(props) {
    const { children, noMenu } = props;
 
    return (
        <div>
            {typeof noMenu !== undefined &&
                <RightMenu>
                    <ButtonIcon
                        navTo={'/'}
                    >
                        <AppMenu />
                    </ButtonIcon>
                </RightMenu>
            }
            <Title>{children}</Title>
        </div>
    )
}
export default HeaderBar;