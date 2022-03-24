import React from 'react';
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

export default function Index({ location }) {
  const isHome = location && location.search.length <= 1;
  const params = queryString.parse(location.search);
  const p = !isHome && params.p;
  return (
    <SpaceSuit>
      <HeaderBar noMenu={isHome}>
            N E O N A V
      </HeaderBar>
          {isHome && <PrivateRoute location={location} component={Home} />}
          {p === 'chat' && <PrivateRoute location={location} component={Chat} />}
          {p === 'cash' && <PrivateRoute location={location} component={Cash} />}
          {p === 'profile' && <PrivateRoute location={location} component={Profile} />}
          {p === 'security' && <PrivateRoute location={location} component={Security} />}
          {p === 'channels' && <PrivateRoute location={location} component={Channels} />}
          {p === 'contacts' && <PrivateRoute location={location} component={Contacts} />}
          {p === 'notes' && <PrivateRoute location={location} component={Notes} />}
          {p !== 'chat' && p !== 'cash' && <FooterNav />}
    </SpaceSuit>
  )
}
