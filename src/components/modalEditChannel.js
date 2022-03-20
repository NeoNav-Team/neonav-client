import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import PopoverQRReader from './popoverQRReader';
import {
    Typography,
    Tag,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getChannelUsers, addUserToChannel } from '../services/chat';

const { Text, Title } = Typography;

function ModalCreateChannel(props) {
    const [channelUsers, setChannelUsers] = useState([]);
    const { fieldKey: channelId, myChannels } = props;
    const channel = _.filter(myChannels, ['id', channelId])[0];
    const channelName = _.get(channel, 'name', '');
    const channelAdmin = _.get(channel, 'admin', '');

    const onQRRead = userId => {
      addUserToChannel(channelId, userId).then(res => {
        console.log('res.data', res.data);
        // setChannelUsers(myUsers);
    }).catch(err => {
        console.log('err', err);
    });
    }


    useEffect(() => {
      getChannelUsers(channelId).then(res => {
          const myUsers = res.data;
          setChannelUsers(myUsers);
      }).catch(err => {
          console.log('err', err);
      });
    }, [channelId]);

    return (
    <>
        <Title level={2} style={{color:'#fff'}}>{channelName}</Title>
        <Title level={4} style={{color:'#fff'}}>Add User</Title>
        <PopoverQRReader successHandler={onQRRead} />
        <Title level={4} style={{color:'#fff'}}>Active Users</Title>
        <p style={{lineHeight: '30px'}}>
          {channelUsers && channelUsers.map((user, index) => { return (
            <Tag key={index} color={channelAdmin !== user.userid ? 'rgba(0,0,0, 0.5)' : 'rgba(255,0,255, 0.75)'}><UserOutlined /> <Text key={index}>{user.username || user.userid}</Text></Tag> 
          )})}
        </p>
    </>
)   
}
export default ModalCreateChannel;    
