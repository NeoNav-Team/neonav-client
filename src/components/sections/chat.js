import React from 'react';
import styled from 'styled-components';
import ChatChannelMenu from '../../components/chatChannelMenu';
import ChatInfiniteDisplay from '../../components/chatInfiniteDisplay';
import ChatInputBar from '../../components/chatInputBar';
import { useWindowDimensions } from '../../utils/responsive';
import { useMediaQuery } from 'react-responsive';

const StyledChatContainer = styled.div`
  background: transparent;
  color: red;
  margin: 0 auto 16px;
  padding: 0;
  overflow: hidden;
  position: relative;
  min-height: 100%;
  &.pitch-mixin {
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0.125))  50% 50% / 100% 100%;
    --aug-inlay-opacity: 0.5;
  }
`;

export default function Chat() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const { height } = useWindowDimensions();
  const headerBarHeight = isTabletOrMobile ? 64 : 96;
  const chatChannelHeight = isTabletOrMobile ? 64 : 96;
  const chatInputHeight = 48;

  const chatBoxHeight = height - chatChannelHeight - chatInputHeight - headerBarHeight;

  return (
    <StyledChatContainer className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x bl-clip both">
       <ChatChannelMenu />
       <ChatInfiniteDisplay height={chatBoxHeight} />
       <ChatInputBar />
    </StyledChatContainer>
  )
}
