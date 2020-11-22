import React, { useState } from 'react';
import styled from 'styled-components';
import ChannelIcon from './channelIcon';
import SliderIcon from './sliderIcon';
import More from './icons/more';
import _ from 'lodash';
import Slider from 'react-slick';
import { colors } from '../constants/defaults';

const {primaryCyan, primaryIndigo, primaryMagenta } = colors;

const StyledInputDiv = styled.div`
    display: block;
    position: relative;
    left: 0;
    min-height: 64px;
    width: 100%;
    padding-top: 10px;
    text-align: center;
    overflow: hidden;
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
    &div {
      top: 20px;
    }
`;

const PrevBtn = styled.div`
    position: absolute;
    left: 8px;
    top: 12px;
    z-index: 50;
    cursor: pointer;
    opacity: 0.5;
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
    top: 12px;
    z-index: 50;
    cursor: pointer;
    opacity: 0.5;
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


function ChatChannelMenu(props) {
    const { channels, selected, clickHandler} = props;
    const [ activeChannel, setActiveChannel ] = useState(selected || null);

    const chunkedItems = channels ? _.chunk(channels, channels.length) : [];
    var settings = {
      dots: false,
      infinite: true,
      nextArrow: <NextBtn><div className="arrow" data-augmented-ui="all-hexangle-right border" /></NextBtn>,
      prevArrow: <PrevBtn><div className="arrow" data-augmented-ui="all-hexangle-left border" /></PrevBtn>,
      centerMode: false,
      accessibility: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    const updateCurrentChannel = channel => {
      typeof clickHandler !== 'undefined' && clickHandler(channel);
    }

    const createChannel = () => {};

    const selectActiveChannel = channel => {
        setActiveChannel(channel);
        updateCurrentChannel(channel);
    }

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x br-clip bl-clip both">
              <Slider {...settings}>
                        {chunkedItems.map((arr, index) => (
                            arr.map((item, kindex) => {
                                const id = item.id;
                                const title = _.get(item, 'name', '').split('.').pop();
                                return (<ChannelIcon
                                    key={`tnicn_${index}-${kindex}`} 
                                    active={activeChannel === id}
                                    title={title}
                                    handleClick={_.partial(selectActiveChannel, id)}
                                />)
                            })
                        ))}
                            <SliderIcon
                                    key={`tnicn_more`} 
                                    title={<More />}
                                    handleClick={createChannel}
                            />
                </Slider>
            </StyledInputDiv>
        </div>
    )
}

export default ChatChannelMenu;