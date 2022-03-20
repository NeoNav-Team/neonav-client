import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import _ from 'lodash';
// import PopoverQRReader from './popoverQRReader';
import {
    // Alert,
    // Button,
    Form,
    Typography,
    Tag,
    // Input
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getChannelUsers, addUserToChannel } from '../services/chat';

const { Text, Title } = Typography;

function ModalCreateChannel(props) {
    const [errMsg, setErrMsg] = useState(null);
    const [channelUsers, setChannelUsers] = useState([]);
    const [form] = Form.useForm();
    const { fieldKey: channelId, myChannels } = props;
    const channel = _.filter(myChannels, ['id', channelId])[0];
    const channelName = _.get(channel, 'name', '');
    const channelAdmin = _.get(channel, 'admin', '');

    const goChannelUsers  = async value => {
        const response = getChannelUsers(value);
        return await response;
    };

    const onFinish = value => {
        setErrMsg(null);
        // goCreateChannel(value).then(res => {
        //     if (res.status !== 200 && res.data.message) {
        //         setErrMsg(res.data.message || res.statusText);
        //     } else {
        //         navigate('/?p=channels', { replace: true });
        //     }
        // }).catch(err => {
        //     setErrMsg('Connection error. Please try again later.');
        //     console.log('err', JSON.stringify(err));
        // });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onQRRead = userId => {
      addUserToChannel(channelId, userId).then(res => {
        const myUsers = res.data;
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
      console.log('props.myChannels', props.myChannels);
    }, [props]);

    return (
    <>
        <Title level={2} style={{color:'#fff'}}>{channelName}</Title>
        <Title level={4} style={{color:'#fff'}}>Add User</Title>
        {/* <PopoverQRReader successHandler={onQRRead} /> */}
        <Title level={4} style={{color:'#fff'}}>Active Users</Title>
        <p style={{lineHeight: '30px'}}>
          {channelUsers && channelUsers.map((user, index) => { return (
            <Tag key={index} color={channelAdmin !== user.userid ? 'rgba(0,0,0, 0.5)' : 'rgba(255,0,255, 0.75)'}><UserOutlined /> <Text key={index}>{user.username || user.userid}</Text></Tag> 
          )})}
        </p>
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* <Form.Item
                name="add"
                label="Add a user"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="remove"
                label="Remove a user"
            >
                <Input />
            </Form.Item>
            {errMsg && 
              <Form.Item>
                  <Alert message={errMsg} type="error" />
              </Form.Item>  
            }
            <Form.Item>
                <Button type="primary" htmlType="submit">

                </Button>
            </Form.Item> */}
        </Form>
    </>
)   
}
export default ModalCreateChannel;    
