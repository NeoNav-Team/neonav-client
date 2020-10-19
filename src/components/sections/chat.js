import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ChatChannelMenu from '../../components/chatChannelMenu';
import ChatInfiniteDisplay from '../../components/chatInfiniteDisplay';
import ChatInputBar from '../../components/chatInputBar';
import { chatChannels, getChatStore, getMessages, pollChatter } from '../../services/chat';
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

export default function Chat({ location }) {
  // sizing values
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const { height } = useWindowDimensions();
  const headerBarHeight = isTabletOrMobile ? 64 : 96;
  const chatChannelHeight = isTabletOrMobile ? 64 : 96;
  const chatInputHeight = 48;
  const chatBoxHeight = height - chatChannelHeight - chatInputHeight - headerBarHeight;
  //chat data
  const [ chatStore, setChatStore ] = useState(getChatStore);
 const [ messages, setMessages ] = useState(getMessages)
  const [ chatData, setChatData ] = useState(null);
  const showMessage = value => {
    //save latest marker
    console.log('value', value);
    if (Array.isArray(value)) {
      console.log('this is an array');
      const messageArr = [_.cloneDeep(value).slice(1)];
      console.log('messageArr', messageArr);
      console.log('messages', messages);
      const newChatStore = {
        ...chatStore,
        sinceMarker: value[0]
      };
      const newMessages = [
        ...messages,
        ...messageArr
      ];
      setChatStore(newChatStore);
      setMessages(newMessages);
    }
  };
  const getChannels = async () => {
    const response = chatChannels();
    return await response;
  };
  const getChatter = async () => {
    pollChatter(showMessage, chatStore.sinceMarker);
  };

  useEffect(() => {
    getChannels().then(res => {
        res.data = _.get(res, 'data', false) ? res.data : [];
        const channelsObj = {channels: res.data};
        const newChatStore = {
          ...chatStore,
          ...channelsObj
        };
        setChatStore(newChatStore);
        localStorage.setItem('nnChatStore', JSON.stringify(newChatStore));
        getChatter();
    }).catch(err => {
        console.log('err', err);
    });
  }, [location]);

  useEffect(() => {}, [messages]);

  return (
    <StyledChatContainer className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x bl-clip br-clip border">
       <ChatChannelMenu channels={chatStore.channels} />
       <ChatInfiniteDisplay height={chatBoxHeight}>
         {JSON.stringify(messages)}
      </ChatInfiniteDisplay>
       <ChatInputBar />
    </StyledChatContainer>
  )
}
