import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import {
    Typography,
    Tag,
    Button,
} from 'antd';
import IdActions from '../components/idActions';
import { UserOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined} from '@ant-design/icons';
import { getUser } from '../services/auth';
import { getChannelUsers, addUserToChannel, removeUserToChannel, changeAdminToChannel } from '../services/chat';

const { Text, Title } = Typography;

function ModalCreateChannel(props) {
    const [channelUsers, setChannelUsers] = useState([]);
    const nnUser = getUser();
    const { fieldKey: channelId, myChannels } = props;
    const channel = _.filter(myChannels, ['id', channelId])[0];
    const channelName = _.get(channel, 'name', '');
    const channelAdmin = _.get(channel, 'admin', '');
    const userId = nnUser.userid;
    const isChannelAdmin = channelAdmin === userId;


    const selectionUsers = channelUsers => {
      const selectItems = []
      channelUsers.map(user => {
        const value = user.userid;
        const name = `${user.userid} ➤ ${user.username}`;
        value !== userId && selectItems.push({value, name});
      })
      return selectItems;
    }

    const updateChannelUsers = channelId => {
      getChannelUsers(channelId).then(res => {
        const myUsers = res.data;
        setChannelUsers(myUsers);
      }).catch(err => {
          console.log('err', err);
      });
    }

    const onAddUser = userId => {
      addUserToChannel(channelId, userId).then(res => {
        updateChannelUsers(channelId);
    }).catch(err => {
        console.log('err', err);
    });
    }

    const onRemoveUser = userId => {
      removeUserToChannel(channelId, userId).then(res => {
        updateChannelUsers(channelId);
      }).catch(err => {
          console.log('err', err);
      });
    }

    const onChangeAdmin = userId => {
      changeAdminToChannel(channelId, userId).then(res => {
        navigate('/?p=channels', { replace: true });
    }).catch(err => {
        console.log('err', err);
    });
    }

    const handleLeave = () => {
      removeUserToChannel(channelId, userId).then(res => {
        navigate('/', { replace: true });
      }).catch(err => {
          console.log('err', err);
      });
    }

    useEffect(() => {
      channelId && updateChannelUsers(channelId);
    }, [channelId]);
    

    return (
    <>
        <Title level={2} style={{color:'#fff'}}>{channelName}</Title>
        {isChannelAdmin && (
          <>
            <Title level={4} style={{color:'#fff'}}>Admin Options</Title>
            <IdActions title="Add User to Channel" successHandler={onAddUser} icon={<UserAddOutlined />} />
            <IdActions title="Remove User from Channel" successHandler={onRemoveUser} icon={<UserDeleteOutlined />} />
            <IdActions title="Reassign Admin to Channel" successHandler={onRemoveUser} icon={<UserSwitchOutlined />} />
          </>
        )}
        <Title level={4} style={{color:'#fff'}}>Active Users</Title>
        <p style={{lineHeight: '30px'}}>
          {channelUsers && channelUsers.map((user, index) => { return (
            <Tag key={index} color={channelAdmin !== user.userid ? 'rgba(0,0,0, 0.5)' : 'rgba(255,0,255, 0.75)'}><UserOutlined /> <Text key={index}>{user.username || user.userid}</Text></Tag> 
          )})}
        </p>
        <Title level={4} style={{color:'#fff'}}>Actions</Title>
        <Button onClick={handleLeave} style={{backgroundColor: '#ff00a0', fontSize: '12px'}}>Leave Channel</Button>
    </>
)   
}
export default ModalCreateChannel;    
