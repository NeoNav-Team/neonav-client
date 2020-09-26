import React from 'react';
import ChatChannelMenu from '../../components/chatChannelMenu';
import ChatInfiniteDisplay from '../../components/chatInfiniteDisplay';
import ChatInputBar from '../../components/chatInputBar';

export default function Chat() {

  return (
    <>
       <ChatChannelMenu />
       <ChatInfiniteDisplay />
       <ChatInputBar />
    </>
  )
}
