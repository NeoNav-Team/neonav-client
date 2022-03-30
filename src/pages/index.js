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
import { restrictedChannels } from '../constants/defaults';

export default function Index({ location }) {
  const isHome = location && location.search.length <= 1;
  const params = queryString.parse(location.search);
  const p = !isHome && params.p;
  const c = !isHome && params.c;

  // notfications
  const [notices, setNotices] = useState({});
  const [recentChannels, setRecentChannels] = useState([]);

  let specialChannels = _.clone(restrictedChannels);
  specialChannels.push('22c6fec7b63257ca0d7b74394605813e') //global chat


  const setNotify = (id, state) => {
    let clearedNotices = _.cloneDeep(notices);
    let nextID = _.clone(id);
    if (nextID === 'cash' ){
      clearedNotices.cash = state || false;
    } else {
      clearedNotices[nextID] = state || false;
      if(specialChannels.indexOf(nextID) === -1) { //if not a special channel
        let unviewedChannels = _.clone(recentChannels);
        if (state === true && unviewedChannels.indexOf(nextID) === -1) {
          nextID && unviewedChannels.push(nextID);
        } else if (state === false) {
          unviewedChannels = _.pull(unviewedChannels, nextID);
        }
        nextID && setRecentChannels(unviewedChannels);
      }
    }
    setNotices(clearedNotices);
  }

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
    if (lastMessage.channel === restrictedChannels[0]) {
      message.info({
        content: lastMessage.text,
        duration: 2, 
        onClick: _.partial(onMessageClose, `/?p=${lastMessage.notifyapp}`),
      });
      const c = lastMessage.notifyapp === 'cash' ? lastMessage.notifyapp : lastMessage.channel || null;
      setNotify(c, true);
    } else if (lastMessage.channel === restrictedChannels[1]) {
      message.warn({
        content: lastMessage.text,
        duration: 4,
      });
      setNotify(restrictedChannels[1], true);
    } else {
      setNotify(lastMessage.channel, true);
    }
  }

  useEffect(() => {
    getLatest();
  }, []);

  useEffect(() => {
    c ? setNotify(c, false) : setNotify(p, false);
  }, [p, c]);

  useEffect(() => {
    pushToAnnounce(lastMessage);
  }, [lastMessage]);


  return (
    <SpaceSuit>
      <HeaderBar noMenu={isHome}>
            N E O N A V
      </HeaderBar>
          {isHome && <PrivateRoute location={location} recentChannels={recentChannels} component={Home} notices={notices} />}
          {p === 'chat' && <PrivateRoute location={location} setNotify={setNotify} lastMessage={lastMessage} component={Chat} />}
          {p === 'cash' && <PrivateRoute location={location} lastMessage={lastMessage} component={Cash} />}
          {p === 'profile' && <PrivateRoute location={location} component={Profile} />}
          {p === 'security' && <PrivateRoute location={location} component={Security} />}
          {p === 'channels' && <PrivateRoute location={location} recentChannels={recentChannels} component={Channels} />}
          {p === 'contacts' && <PrivateRoute location={location} lastMessage={lastMessage} component={Contacts} />}
          {p === 'notes' && <PrivateRoute location={location} component={Notes} />}
          {p !== 'chat' && p !== 'cash' && <FooterNav />}
    </SpaceSuit>
  )
}
