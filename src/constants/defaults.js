import React from 'react';
import {
    RocketTwoTone,
    ClockCircleTwoTone,
    MinusCircleTwoTone,
    SmileTwoTone
} from '@ant-design/icons';

export const colors = {
    "primary-cyan":`#41c5ff`,
    "primary-magenta":`#ff00a0`,
    "primary-indigo":`#7a04eb`,
    "primary-color": `#fff`
};

export const modals = [
    'kitty',
    'userSettings',
    'myQRCode',
    'editField',
    'editAvatar',
    'editPass'
];

export const statusIcons = {
    'departing': <RocketTwoTone rotate={45} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'arriving': <RocketTwoTone rotate={135} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'en_route': <RocketTwoTone rotate={90} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'busy': <ClockCircleTwoTone style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'away': <MinusCircleTwoTone style={{fontSize: '2.5vh', verticalAlign:'sub'}} />,
    'available': <SmileTwoTone rotate={15} style={{fontSize: '2.5vh', verticalAlign:'sub'}} />
}