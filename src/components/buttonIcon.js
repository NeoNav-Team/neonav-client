import React from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import { logout } from '../services/auth';
import styled from 'styled-components';
import { colors } from '../constants/defaults';

const {primaryCyan, primaryIndigo, primaryColor } = colors;

const IconWrap = styled.div`
    position: relative;
    margin: 0 auto;
    height: 96px;
    width: 96px;
    opacity: 1;
    .augment {
        position: absolute;
        transition: all 0.25s ease-out;
        opacity: 0.66;
        margin-left: 6px;
        margin-top: 6px;
        --aug-all-width: 84px;
        --reticle-color: ${primaryCyan};
        --aug-border-all: 1px;
        --reticle-size: calc(var(--aug-all-width) * 0.25);
        --aug-border-bg: radial-gradient(
          circle at top center,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        ), radial-gradient(
          circle at bottom 13.92% right 6.89%,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        ), radial-gradient(
          circle at bottom 13.92% left 6.89%,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        );
    }
    .abg {
        position: absolute;
        margin-left: 6px;
        margin-top: 6px;
        top: 6px;
        transition: all 0.25s ease-out;
        opacity: 0.5;
        --aug-all-width: 84px;
        --aug-border-all: 1px;
        --reticle-size: var(--aug-all-width);
        --aug-border-bg: radial-gradient(
          circle at top center,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        ), radial-gradient(
          circle at bottom 13.92% right 6.89%,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        ), radial-gradient(
          circle at bottom 13.92% left 6.89%,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        );
    }
    button {
        background-color: transparent;
        background-repeat:no-repeat;
        border: none;
        cursor:pointer;
        outline:none;
        height: 96px;
        width: 96px;
        position: absolute;
        top: 50%;
        transform: translateY(-55%);
    }
    & :hover {
        & .augment {
            opacity: 1;
            margin-left: 0;
            margin-top: 0;
            --aug-border-all: 2px;
            filter: drop-shadow(0 0 0 ${primaryIndigo});
            --aug-all-width: 96px;
        }
    }
    & :disabled {
        opacity:.25
        pointer-events: none;
    }

    &.even {
        .augment, .abg {
            transform: rotateZ(180deg);
        }
        .abg {
            margin-top: 0;
        }
    }

    @media screen and (max-width: 1024px) {
        height: 60px;
        width: 60px;
        .augment, .abg {
            margin-left: 4px;
            margin-top: 4px;
            --aug-all-width: 52px;
        }
        button {
            height: 60px;
            width: 60px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        & :hover {
            & .augment {
                margin-left: 0;
                margin-top: 0;
                --aug-border-all: 2px;
                --aug-all-width: 60px;
            }
        }
    }
`;

const IconName = styled.div`
    display:inline-block;
    text-align: center;
    padding: 0 12px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${primaryColor};
    span {
        color: ${primaryColor};
        padding: 0;
        margin: 0;
        filter: drop-shadow(0 0 5px ${primaryColor});
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 96px;
    }
    @media screen and (max-width: 1024px) {
        span {
            font-size: 10px;
            max-width: 48px;
        }
    }
`;

function ButtonIcon(props) {
    const { height, width, title, isEven, navTo, children } = props;
    const navtoPage = route => {
        if (route === '/logout') {
            logout(() => {
                navigate('/login#loggedOut');
            });
        } else {
            navigate(route);
        }
    };

  return (
    <div>
    <IconWrap className={isEven && 'even'}>
        <div className="abg" data-augmented-ui="all-hexangle-down inlay" />
        <div className="augment" data-augmented-ui="all-hexangle-up border" />
            <button
                height={height}
                width={width}
                onClick={navTo && _.partial(navtoPage, navTo)}
            >
                {children}
            </button>
    </IconWrap>
    {title &&
        <IconName data-augmented-ui="tl-clip br-clip inlay">
            <span>{title}</span>
        </IconName>
    }
    </div>
  )
}
export default ButtonIcon;