import React from 'react';
import styled from 'styled-components';
import AppMenu from './icons/appMenu';
import ButtonIcon from './buttonIcon';

const Title  = styled.h1`
    color: #fff;
    font-size: 16px;
    line-height: 64px;
    margin-bottom: 0;
    vertical-align: middle;
    filter: drop-shadow(0 0 5px #fff);
    width: calc(100% - 64px);
    & span {
        font-size: 0.66rem;
    }
`;

const RightMenu  = styled.div`
  position: absolute;
  right: 0;
  top:0;
  padding-top: 8px;
  padding-right: 4px;
  height: 64px;
  svg {
      height: 40px;
  }
`;
const Bar = styled.div`
    border: 0;
    width: 100%;
    height: 64px;
    margin: 0;
    padding: 0 16px;
`;

function HeaderBar(props) {
    const { children, noMenu } = props;
 
    return (
        <Bar>
            {!noMenu &&
                <RightMenu>
                    <ButtonIcon
                        height={'40px'}
                        navTo={'/'}
                    >
                        <AppMenu />
                    </ButtonIcon>
                </RightMenu>
            }
            <Title>{children}</Title>
        </Bar>
    )
}
export default HeaderBar;