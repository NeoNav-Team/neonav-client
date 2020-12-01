import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants/defaults';

const {primaryCyan, primaryIndigo, primaryMagenta, primaryColor } = colors;

const InlineDiv = styled.div`
    background: transparent;
    display: inline-block;
    position:relative;
    margin: 0 10px;
`;

const IconWrap = styled.div`
    position: relative;
    margin: 0 auto;
    height: 48px;
    width: 48px;
    opacity: 1;
    transition: all 0.125s ease-out;
    .augment {
        position: absolute;
        transition: all 0.25s ease-out;
        opacity: 0.66;
        top: -4px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(60deg);
        --aug-all-width: 48px;
        --reticle-color: ${primaryCyan};
        --aug-border-all: 1px;
        --reticle-size: calc(var(--aug-all-width) * 0.25);
        --aug-border-bg: radial-gradient(
          circle at top center,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        ), radial-gradient(
          circle at bottom center,
          var(--reticle-color) var(--reticle-size),
          transparent var(--reticle-size)
        );
    }
    .abg {
        position: absolute;
        transition: all 0.25s ease-out;
        opacity: 0.5;
        width: 48px;
        height: 48px;
        top: 50%;
        left: 50%;
        margin:0;
        padding: 0;
        transform: translate(-50%, -50%);
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryCyan}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    }
    .icon {
        opacity: 0.5;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        font-size: 10px;
        line-height: 10px;
        max-width: 80px;
        transition: all 0.125s ease-out;
    }
    & :hover {
        cursor: pointer;
        transform: rotateZ(0deg);
        & .augment {
            opacity: 1;
            --aug-border-all: 2px;
            filter: drop-shadow(0 0 0 ${primaryIndigo});
            --aug-all-width: 48px;
            transform: translate(-50%, -50%) rotateZ(0deg);
        }
        & .icon {
            filter: drop-shadow(0 0 5px ${primaryCyan});
        }
    }
    & :disabled {
        opacity:.25
        pointer-events: none;
    }

    &.active {
        min-width: 144px;
        & .augment {
            opacity: 1;
            --aug-border-all: 2px;
            filter: drop-shadow(0 0 0 ${primaryIndigo});
            --aug-all-width: 48px;
            transform: translate(-50%, -50%) rotateZ(0deg);
        }
        & .abg {
            margin-top: 0;
            width: 144px;
            --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryMagenta}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
            --aug-border-bg: radial-gradient(${primaryCyan}, ${primaryCyan}) 100% 100% / 100% 100%;
        }
        & .icon {
            font-size: 12px;
            width: 144px;
            min-width: 144px;
            max-width: 144px;
            text-align: center;
            transform: translate(-50%, -50%) rotateZ(0deg);
            color: ${primaryColor};
            filter: drop-shadow(0 0 5px ${primaryColor});
        }
        & :hover {
            cursor: inherit;
            & .augment {
                opacity: 1;
                --aug-border-all: 2px;
                filter: drop-shadow(0 0 0 ${primaryIndigo});
                --aug-all-width: 48px;
                transform: translate(-50%, -50%) rotateZ(0deg);
            }
        }
    }

`;

function SliderIcon(props) {
    const { active, handleClick, icon } = props;

  return (
    <InlineDiv
        className={active ? 'active' : ''}
        onClick={handleClick}
    >
        <IconWrap className={active && 'active'} data-augmented-ui-reset>
            <div className="abg" data-augmented-ui="tl-clip tr-clip br-clip bl-clip both" />
            <div className="icon">{icon}</div>
        </IconWrap>
    </InlineDiv>
  )
}
export default SliderIcon;