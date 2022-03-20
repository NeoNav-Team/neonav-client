import React, { useState } from 'react';
import { navigate } from 'gatsby';
import {
    Alert,
    Button,
    Form,
    Input
} from 'antd';
import { createChannel } from '../services/chat';

function ModalCreateChannel(props) {
    const [errMsg, setErrMsg] = useState(null);
    const [form] = Form.useForm();

    const goCreateChannel  = async value => {
        const response = createChannel(value);
        return await response;
    };

    const onFinish = value => {
        setErrMsg(null);
        goCreateChannel(value).then(res => {
            if (res.status !== 200 && res.data.message) {
                setErrMsg(res.data.message || res.statusText);
            } else {
                navigate('/?p=channels', { replace: true });
            }
        }).catch(err => {
            setErrMsg('Connection error. Please try again later.');
            console.log('err', JSON.stringify(err));
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    // useEffect(() => {
    //     form.setFieldsValue({
    //         name
    //     });
    // }, [form, value]);

    return (
    <>
        <p>Create A Channel</p>
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="name"
                label="Channel Name"
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
                    Create
                </Button>
            </Form.Item>
        </Form>
    </>
)   
}
export default ModalCreateChannel;    
