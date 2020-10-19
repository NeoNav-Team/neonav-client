import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import ChannelIcon from './channelIcon';
import _ from 'lodash';
import { useSwipeable } from 'react-swipeable';
import { colors } from '../constants/defaults';

const {primaryCyan, primaryIndigo, primaryMagenta } = colors;

const StyledInputDiv = styled.div`
    display: block;
    position: relative;
    left: 0;
    min-height: 96px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    padding: 10px;
    background: transparent;
    @media screen and (max-width: 900px) {
        min-height: 64px;
    }
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    }
`;

const DaddyWrapper = styled.div`
    overflow-y: visible;
    position: absolute;
    left: 40px;
    width: calc(100% - 80px);
`;

const CarouselContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    @media screen and (max-width: 900px) {
        margin-top: -2px;
    }
    transition: ${props => (props.sliding ? "none" : "transform 1s ease")};
    transform: ${props => {
      if (!props.sliding) return "translateX(calc(-80% - 20px))";
      if (props.dir === PREV) return "translateX(calc(2 * (-80% - 20px)))";
      return "translateX(0%)";
    }};
    &.single {
      transform: translateX(0%)
    }
  `;

const Wrapper = styled.div`
  overflow: visible;
  min-height: 64px;
  left: 40px;
`;

const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 100%;
  min-width: 100%;
  height: 64px;
  overflow-y: visible;
  order: ${props => props.order};
`;
const PrevBtn = styled.div`
    position: absolute;
    left: 8px;
    bottom : 28px;
    z-index: 50;
    cursor: pointer;
    opacity: 0.5;
    @media screen and (max-width: 900px) {
        bottom: 8px;
    }
    .arrow {
        --aug-all-width: 30px;
        --aug-inlay: initial;
        --aug-inlay-all: 2px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryIndigo}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryCyan}, ${primaryMagenta}) 100% 100% / 100% 100%;
    }
    &:hover {
        opacity: 1;
    }
`;
const NextBtn = styled.div`
    display: block;
    position: absolute;
    right: 8px;
    bottom: 28px;
    z-index: 50;
    cursor: pointer;
    opacity: 0.5;
    @media screen and (max-width: 900px) {
        bottom: 8px;
    }
    .arrow {
        --aug-all-width: 30px;
        --aug-inlay: initial;
        --aug-inlay-all: 2px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryIndigo}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryCyan}, ${primaryMagenta}) 100% 100% / 100% 100%;
    }
    &:hover {
        opacity: 1;
    }
`;

const NEXT = "NEXT";
const PREV = "PREV";
const initialState = { pos: 1, sliding: false, dir: NEXT };
const getOrder = ({ index, pos, numItems }) => {
    const newOrder = index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
    return newOrder;
  };

function ChatChannelMenu(props) {
    const { channels, currentChannel, clickHandler} = props;
    const [ activeChannel, setActiveChannel ] = useState(currentChannel || null);
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const maxItems = 3;
    const chunkedItems = _.chunk(channels, maxItems);
    const totesChunks = chunkedItems.length;
    const isPaginated = totesChunks >= 2;
    const [ showArrows, setShowArrows ] = useState(isPaginated);
    const slide = dir => {
      dispatch({ type: dir, totesChunks });
      setTimeout(() => {
        dispatch({ type: "stopSliding" });
      }, 50);
    };
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => slide(NEXT),
        onSwipedRight: () => slide(PREV),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });
    const updateCurrentChannel = channel => {
      typeof clickHandler !== 'undefined' && clickHandler(channel);
    }

    const selectActiveChannel = channel => {
        setActiveChannel(channel);
        updateCurrentChannel(channel);
    }
    useEffect(() => {
      setShowArrows(isPaginated);
  }, [totesChunks, isPaginated]);

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x br-clip bl-clip both">
                <DaddyWrapper {...(showArrows && {...swipeHandlers})}>
                    <Wrapper>
                        <CarouselContainer
                          dir={state.dir}
                          sliding={state.sliding}
                          className={!showArrows && 'single'}
                        >
                            {chunkedItems.map((arr, index) => (
                                <CarouselSlot
                                    key={index}
                                    order={getOrder({ index, pos: state.pos, numItems: maxItems })}
                                >
                                {arr.map((item, kindex) => {
                                    const id = item.id;
                                    const title = _.get(item, 'name', '').split('.').pop();
                                    return (<ChannelIcon
                                        key={`tnicn_${index}-${kindex}`} 
                                        active={activeChannel === id}
                                        title={title}
                                        handleClick={_.partial(selectActiveChannel, id)}
                                    />)
                                })}
                                </CarouselSlot>
                            ))}
                        </CarouselContainer>
                    </Wrapper>
                </DaddyWrapper>
                {showArrows && <>
                    <PrevBtn onClick={_.partial(slide, 'PREV')}>
                        <div className="arrow" data-augmented-ui="all-hexangle-left border" />
                    </PrevBtn>
                    <NextBtn onClick={_.partial(slide, 'NEXT')}>
                        <div className="arrow" data-augmented-ui="all-hexangle-right border" />
                    </NextBtn>
                </>}
            </StyledInputDiv>
        </div>
    )
}

function reducer(state, { type, totesChunks }) {
    switch (type) {
      case "reset":
        return initialState;
      case PREV:
        return {
          ...state,
          dir: PREV,
          sliding: true,
          pos: state.pos === 0 ? totesChunks - 1 : state.pos - 1
        };
      case NEXT:
        return {
          ...state,
          dir: NEXT,
          sliding: true,
          pos: state.pos === totesChunks - 1 ? 0 : state.pos + 1
        };
      case "stopSliding":
        return { ...state, sliding: false };
      default:
        return state;
    }
  }

export default ChatChannelMenu;