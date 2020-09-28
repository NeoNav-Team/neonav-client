import React from 'react';
import styled from 'styled-components';
import AppMenu from './icons/appMenu';
import ButtonIcon from './buttonIcon';

const Title  = styled.h1`
    color: #fff;
    font-size: 28px;
    line-height: 96px;
    margin-bottom: 0;
    vertical-align: middle;
    filter: drop-shadow(0 0 5px #fff);
    width: calc(100% - 64px);
    & span {
        font-size: 0.66rem;
    }
    @media screen and (max-width: 900px) {
        line-height: 64px;
        font-size: 16px;
    }
`;

const RightMenu  = styled.div`
  position: absolute;
  right: 0;
  top:0;
  padding-top: 8px;
  padding-right: 4px;
  height: 96px;
  svg {
      margin-top: 6px;
      height: 68px;
  }
    @media screen and (max-width: 900px) {
        height: 64px;
        svg {
            height: 40px;
        }
    }
`;
const Bar = styled.div`
    border: 0;
    width: 100%;
    height: 96px;
    margin: 0;
    padding: 0 16px;
    /* phones */
    @media screen and (max-width: 900px) {
        height: 64px;
    }
`;

function HeaderBar(props) {
    const { children, noMenu } = props;
 
    return (
        <Bar>
            {!noMenu &&
                <RightMenu>
                    <ButtonIcon
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