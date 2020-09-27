import React from 'react';
import SpaceSuit from '../components/spaceSuit';
import HeaderBar from '../components/headerBar';

export default ({ pageContext: { profile } }) => {

  return (
    <SpaceSuit>
        <HeaderBar>
            Profile Page
        </HeaderBar>
        <p>{JSON.stringify(profile)}</p>
    </SpaceSuit>
  )
}
