import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import {
    Typography,
    Tag,
    Button,
    Switch,
} from 'antd';
import styled from 'styled-components';
import IdActions from '../components/idActions';
import { UserOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined} from '@ant-design/icons';
import { getUser } from '../services/auth';
import { getChannelUsers, addUserToChannel, removeUserToChannel, toggleChannelScope, changeAdminToChannel } from '../services/chat';


const { Text, Title } = Typography;

const StyledSwitch = styled(Switch)`
  backgroundColor: #ff00a0;
  fontSize: 12px;
  margin-left: 10px;
  &.ant-switch-checked {
    background: rgba(255,255,255, 0.5);
  }
`

function ModalCreateChannel(props) {
    const [channelUsers, setChannelUsers] = useState([]);
    const nnUser = getUser();
    const { fieldKey: channelId, myChannels, myFriends } = props;
    const channel = _.filter(myChannels, ['id', channelId])[0];
    const channelName = _.get(channel, 'name', '');
    const channelAdmin = _.get(channel, 'admin', '');
    const userId = nnUser.userid;
    const isChannelAdmin = channelAdmin === userId;
    const defaultScope = _.get(channel, 'scope', 'group') === 'group';


    const selectionUsers = channelUsers => {
      const selectItems = []
      channelUsers.map(user => {
        const value = user.id || user.userid;
        const name = `${user.username || value}`;
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

    const handleChangeScope = () => {
      toggleChannelScope(channelId).then(res => {
        navigate('/?p=channels', { replace: true });
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
            <p><StyledSwitch checkedChildren="Private" unCheckedChildren="Public" defaultChecked={defaultScope} onClick={handleChangeScope} /></p>
            <IdActions title="Add User to Channel" successHandler={onAddUser} data={selectionUsers(myFriends)} icon={<UserAddOutlined />} />
            <IdActions title="Remove User from Channel" successHandler={onRemoveUser} data={selectionUsers(channelUsers)} icon={<UserDeleteOutlined />} />
            <IdActions title="Reassign Admin to Channel" successHandler={onChangeAdmin} data={selectionUsers(channelUsers)} icon={<UserSwitchOutlined />} />
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
