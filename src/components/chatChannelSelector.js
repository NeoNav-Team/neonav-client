import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { colors } from '../constants/defaults';
const {primaryCyan, primaryIndigo, primaryMagenta } = colors;

const StyledSelect = styled.select`
    border: none;
    outline: none;
    background: transparent;
    appearance: none;
    margin: 0;
    display: block;
    position: absolute;
    left: 48px;
    width: calc(100% - 96px);
    padding: 12px 55px 15px 15px;
    font-size: 18px;
    text-align-last:center; 
    color: #fff;
    @media screen and (max-width: 900px) {
        min-height: 64px;
    }
`;

const PrevBtn = styled.div`
    position: absolute;
    left: 8px;
    top: 20px;
    z-index: 50;
    cursor: pointer;
    .arrow {
        --aug-all-width: 30px;
        --aug-inlay: initial;
        --aug-inlay-all: 2px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryIndigo}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryCyan}, ${primaryMagenta}) 100% 100% / 100% 100%;
    }
`;
const NextBtn = styled.div`
    display: block;
    position: absolute;
    right: 8px;
    top: 20px;
    z-index: 50;
    cursor: pointer;
    .arrow {
        --aug-all-width: 30px;
        --aug-inlay: initial;
        --aug-inlay-all: 2px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryIndigo}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryCyan}, ${primaryMagenta}) 100% 100% / 100% 100%;
    }
`;


function ChatChannelMenu(props) {
    const { channels, selectedChannel, clickHandler} = props;
    const channelIDs = channels.map(a => a.id);
    const channelIndex = channelIDs.indexOf(selectedChannel);
    const previousChannel = channelIndex === 0 ? channelIDs[channelIDs.length  - 1] : channelIDs[channelIndex - 1];
    const nextChannel = channelIndex === channelIDs.length - 1 ? channelIDs[0] : channelIDs[channelIndex + 1];


  const setSelectedChannelhandler = event => {
    const selectedId = event.target.value;
    clickHandler(selectedId);
  }

  const setArrowChannelhandler = selectedId => {
    clickHandler(selectedId);
  }

    return (
        <div data-augmented-ui-reset>
            <PrevBtn onClick={_.partial(setArrowChannelhandler, previousChannel)}><div className="arrow" data-augmented-ui="all-hexangle-left border" /></PrevBtn>
                <StyledSelect className="pitch-mixin" value={selectedChannel || ''} data-augmented-ui="tl-clip-x tr-rect-x br-clip bl-clip both" onChange={setSelectedChannelhandler}>
                    {channels.map((channel, index) => {
                        return <option key={`channel_${index}`} value={channel.id}>{channel.name}</option>;
                    })}
                </StyledSelect>
            <NextBtn onClick={_.partial(setArrowChannelhandler, nextChannel)}><div className="arrow" data-augmented-ui="all-hexangle-right border" /></NextBtn>
        </div>
    )
}

export default ChatChannelMenu;