import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import _ from 'lodash';
import queryString from 'query-string';
import ChatChannelSelector  from '../../components/chatChannelSelector';
import ChatInfiniteDisplay from '../../components/chatInfiniteDisplay';
import ChatInputBar from '../../components/chatInputBar';
import ModalEditField from '../../components/modalEditField';
import { 
  getChatChannels,
  orderMessagesbyTimestamp,
  postMessage,
  seedChannel,
} from '../../services/chat';
import { useWindowDimensions } from '../../utils/responsive';
import { useMediaQuery } from 'react-responsive';
import { List, Modal, Typography } from 'antd';
const { Text } = Typography;

const StyledChatContainer = styled.div`
  background: transparent;
  align: left;
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

const StyledChatMessage = styled.div`
  padding: 3vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
  }
`;

const Timestamp = styled(Text)`
  color: white;
  font-weight: 100;
  margin-left: 10px;
  font-size: 10px
  opacity: 0.55;
`;

const User = styled(Text)`
  color: #41c5ff;
  font-weight: 300;
  margin-left: 10px;
  font-size: 12px
`;

const StyledChatMessageLabel = styled.div`
  font-size: 10px;
  padding: 2px;
  width: 70vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
  }
`;

const StyledChatMessageText = styled.div`
  font-size: 12px;
  padding: 10px;
  min-width: 70vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #41c5ff, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#41c5ff, #41c5ff) 100% 100% / 100% 100%;
  }
`;


const StyledModal = styled(Modal)`
  .ant-modal-content {
    background:transparent;
  }
  .ant-modal-close-x {
    margin-top: -50px;
    color:#ff00a0;
    filter: drop-shadow(0 0 8px #ff00a0);
  }
`;


//TODO: THINGS TO COMPLETE CHAT
// 1. WRITE INFININTE SCROLL FOR CHAT

export default function Chat({ location, lastMessage, setNotify }) {
  // sizing values
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const { height } = useWindowDimensions();
  const headerBarHeight = isTabletOrMobile ? 64 : 96;
  const chatChannelHeight = isTabletOrMobile ? 64 : 96;
  const chatInputHeight = 48;
  const chatBoxHeight = height - chatChannelHeight - chatInputHeight - headerBarHeight;

  const params = queryString && queryString.parse(_.get(location, 'search', ''));
  const paramChannel = params && params.c ? params.c : null;

  const [chatChannels, setChatChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(null);

  const closeModal = () => {
      setModal(null);
      navigate('/p=chat');
  }

  const fetchChatChannels = async () => {
    const response = getChatChannels();
    return await response;
  };

  const setInitalStateFromResponse = (res) => {
    const chatChannels = _.get(res, 'data', false) ? res.data : [];
    let selected = selectedChannel ||  paramChannel || chatChannels.find(x => x.name === '谈.global')['id'] || null;
    let myChannels = [];
    if (paramChannel) {
      myChannels = _.filter(chatChannels, ['id', paramChannel]);
    } else {
      myChannels = chatChannels.filter(({scope}) => scope === 'global' || scope === 'group');
    }
    setChatChannels(myChannels);
    setSelectedChannel(selected);
    setNotify(selected, false);
  }

  const setChannelMessagesFromResponse = (res) => {
    const seededChannelMessages = _.get(res, 'data', false) ? res.data : [];
    const oldMessages = _.cloneDeep(messages);
    const collectedMessages = _.unionBy(seededChannelMessages, oldMessages, 'id');
    setMessages(orderMessagesbyTimestamp(collectedMessages));
  }

  useEffect(() => {
    fetchChatChannels().then(res => {
      setInitalStateFromResponse(res);
    }).catch(err => {
        console.log('err', err);
    });
  }, [location]);

  useEffect(() => {
    selectedChannel && seedChannel(selectedChannel).then(res => {
      setChannelMessagesFromResponse(res);
    }).catch(err => {
      console.log('seedChannel err', err);
    });
  },[selectedChannel]);

  useEffect(() => {},[messages])

  useEffect(() => {
    const updatedMessages = _.cloneDeep(messages);
    updatedMessages.push(lastMessage);
    setMessages(orderMessagesbyTimestamp(updatedMessages));
  },[lastMessage])

  return (
    <>
    <StyledChatContainer className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x bl-clip br-clip border">
      <ChatChannelSelector
        channels={chatChannels}
        selectedChannel={selectedChannel}
        setNotify={setNotify}
        clickHandler={setSelectedChannel}
      />
      <ChatInfiniteDisplay height={chatBoxHeight}>
          <List
            dataSource={_.filter(messages, {channel: selectedChannel})}
            renderItem={item => (
                <StyledChatMessage>
                  <StyledChatMessageLabel className="pitch-mixin" data-augmented-ui="tr-clip both">
                    <User>{item.from || item.fromid}</User>
                    <Timestamp>{item.ts}</Timestamp>
                  </StyledChatMessageLabel>
                  <StyledChatMessageText className="pitch-mixin" data-augmented-ui="tr-clip br-round bl-round both">
                    <Text> 》 {item.text}</Text>
                  </StyledChatMessageText>
                </StyledChatMessage>
            )}
          />
      </ChatInfiniteDisplay>
      <ChatInputBar
        channel={selectedChannel}
        submitHandler={postMessage}
      />
    </StyledChatContainer>
    <StyledModal
            title={null}
            visible={modal}
            closable={false}
            onCancel={closeModal}
            bodyStyle={{padding:0, background:'transparent'}}
            footer={null}
            width="75vh"
            >
                {modal === 'addChannel' && <ModalEditField />}
                {modal === 'dropChannel' && <ModalEditField />}
            </StyledModal>
    </>
  )
}
