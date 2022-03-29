import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import queryString from 'query-string';
import SpaceSuit from '../components/spaceSuit';
import PrivateRoute from '../components/privateRoute';
import Home from '../components/sections/home';
import Chat from '../components/sections/chat';
import Cash from '../components/sections/cash';
import Channels from '../components/sections/channels';
import Contacts from '../components/sections/contacts';
import Notes from '../components/sections/notes';
import Security from '../components/sections/security';
import Profile from '../components/sections/profile'; 
import FooterNav from '../components/footerNav';
import HeaderBar from '../components/headerBar';
import { pollChatter } from '../services/chat';
import { message } from 'antd';

export default function Index({ location }) {
  const isHome = location && location.search.length <= 1;
  const params = queryString.parse(location.search);
  const p = !isHome && params.p;

  //latest Message Feeds
  const [sinceMarker, setSinceMarker] = useState(null);
  const [lastMessage, setLastMessage] = useState([]);
    const showSingleMessage = value => {
    if (Array.isArray(value)) {
      const newSinceMarker = value[0];
      const newMessage = value[1];
      setLastMessage(newMessage);
      setSinceMarker(newSinceMarker);
    }
  };

  const getLatest = async () => {
    pollChatter(showSingleMessage, sinceMarker);
  };

  const onMessageClose = notifyapp => {
    navigate(`/p=${notifyapp}`);
  }

  const pushToAnnounce = lastMessage => {
    // display notifcations and annoucements channels 
    if (lastMessage.channel === "d6993467030d7398f0415badd9186aa0") {
      message.info({
        content: lastMessage.text,
        duration: 2, 
        onClick: _.partial(onMessageClose, `/?p=${lastMessage.notifyapp}`),
      });
    } else if (lastMessage.channel === "22c6fec7b63257ca0d7b743946090fa9") {
      message.warn({
        content: lastMessage.text,
        duration: 4,
      }
      );
    }
  }

  useEffect(() => {
    getLatest();
  }, []);

  useEffect(() => {
    console.log('lastMessage', lastMessage);
    pushToAnnounce(lastMessage);
  }, [lastMessage]);


  return (
    <SpaceSuit>
      <HeaderBar noMenu={isHome}>
            N E O N A V
      </HeaderBar>
          {isHome && <PrivateRoute location={location} component={Home} />}
          {p === 'chat' && <PrivateRoute location={location} lastMessage={lastMessage} component={Chat} />}
          {p === 'cash' && <PrivateRoute location={location} lastMessage={lastMessage} component={Cash} />}
          {p === 'profile' && <PrivateRoute location={location} component={Profile} />}
          {p === 'security' && <PrivateRoute location={location} component={Security} />}
          {p === 'channels' && <PrivateRoute location={location} component={Channels} />}
          {p === 'contacts' && <PrivateRoute location={location} lastMessage={lastMessage} component={Contacts} />}
          {p === 'notes' && <PrivateRoute location={location} component={Notes} />}
          {p !== 'chat' && p !== 'cash' && <FooterNav />}
    </SpaceSuit>
  )
}
