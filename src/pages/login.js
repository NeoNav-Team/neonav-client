import React from 'react';
import SpaceSuit from '../components/spaceSuit';
import Logo from '../components/logo';
import FormLogin from '../components/formLogin';

export default function Login({location}) {

  return (
    <SpaceSuit unlocked>
        <Logo />
        <FormLogin location={location} />
    </SpaceSuit>
  )
}
