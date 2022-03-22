import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import PopoverQRReader from './popoverQRReader';
import TinyForm from './tinyForm';
import {
    Typography,
    Tag,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
    const [admin, setAdmin] = useState(channelAdmin);

    const selectionUsers = channelUsers => {
      const selectItems = []
      channelUsers.map(user => {
        const value = user.userid;
        const name = user.username;
        selectItems.push({value, name});
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

    const onRemoveUser = res => {
      const userId = res.remove;
      removeUserToChannel(channelId, userId).then(res => {
        updateChannelUsers(channelId);
    }).catch(err => {
        console.log('err', err);
    });
    }

    const onChangeAdmin = res => {
      const userId = res.reassign;
      changeAdminToChannel(channelId, userId).then(res => {
        setAdmin(userId);
    }).catch(err => {
        console.log('err', err);
    });
    }

    useEffect(() => {
      updateChannelUsers(channelId);
    }, [channelId]);
    

    return (
    <>
        <Title level={2} style={{color:'#fff'}}>{channelName}</Title>
        {isChannelAdmin && (
          <>
            <Title level={4} style={{color:'#fff'}}>Add User</Title>
            <PopoverQRReader successHandler={onAddUser} />
            <Title level={4} style={{color:'#fff'}}>Remove User</Title>
            <TinyForm type='select' label='Remove' name={'remove'} successHandler={onRemoveUser} data={selectionUsers(channelUsers)} />
            <Title level={4} style={{color:'#fff'}}>Reassign Admin</Title>
            <TinyForm type='select' label='Resassign' name={'reassign'} successHandler={onChangeAdmin} data={selectionUsers(channelUsers)} />
          </>
        )}
        <Title level={4} style={{color:'#fff'}}>Active Users</Title>
        <p style={{lineHeight: '30px'}}>
          {channelUsers && channelUsers.map((user, index) => { return (
            <Tag key={index} color={admin !== user.userid ? 'rgba(0,0,0, 0.5)' : 'rgba(255,0,255, 0.75)'}><UserOutlined /> <Text key={index}>{user.username || user.userid}</Text></Tag> 
          )})}
        </p>
    </>
)   
}
export default ModalCreateChannel;    
