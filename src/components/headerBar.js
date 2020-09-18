import React from 'react';
import styled from 'styled-components';
import AppMenu from './icons/appMenu';
import ButtonIcon from './buttonIcon';

const Title  = styled.h1`
    color: #fff;
    font-size: 1rem;
    line-height: 6vh;
    margin-left: 4vh;
    margin-bottom: 0;
    filter: drop-shadow(0 0 5px #fff);
    width: calc(100% - 10vh);
    & span {
        font-size: 0.66rem;
    }
`;

const RightMenu  = styled.div`
  position: absolute;
  right: 0;
  top:0;
  height: 6vh;
  svg {
      height: 6vh;
  }
`;
const Bar = styled.div`
  margin: 0;
  border: 0;
`;

function HeaderBar(props) {
    const { children, noMenu } = props;
 
    return (
        <Bar>
            {!noMenu &&
                <RightMenu>
                    <ButtonIcon
                        height={'6vh'}
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