import React from 'react';
import {
    RocketTwoTone,
    ClockCircleTwoTone,
    MinusCircleTwoTone,
    SmileTwoTone
} from '@ant-design/icons';

export const colors = {
    "primaryCyan":`#41c5ff`,
    "primaryMagenta":`#ff00a0`,
    "primaryIndigo":`#7a04eb`,
    "primaryColor": `#fff`
};

export const modals = [
    'kitty',
    'userSettings',
    'myQRCode',
    'editField',
    'editAvatar',
    'editPass',
    'editChannel',
    'createChannel',
    'payCash',
    'requestCash',
];

// 0 is is notifcations, 1 is annoucements
export const restrictedChannels = ['d6993467030d7398f0415badd9186aa0', '22c6fec7b63257ca0d7b743946090fa9']

export const selectedChat = 'global';

export const statusIcons = {
    'departing': <RocketTwoTone rotate={45} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'arriving': <RocketTwoTone rotate={135} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'en_route': <RocketTwoTone rotate={90} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'busy': <ClockCircleTwoTone style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'away': <MinusCircleTwoTone style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'available': <SmileTwoTone rotate={15} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />
}