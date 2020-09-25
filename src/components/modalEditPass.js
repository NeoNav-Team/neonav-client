import React, { useState }from 'react';
import { navigate } from 'gatsby';
import { Alert } from 'antd';
import { userChangePass } from '../services/auth';
import {
    Input,
    Button,
    Form
} from 'antd';


function ModalEditPass() {
    const [errMsg, setErrMsg] = useState(null);
    const [form] = Form.useForm();

    const goUpdate = async updates => {
        const response = userChangePass(updates);
        return await response;
    };

    const onFinish = values => {
        goUpdate(values).then(res => {
            if (res.status !== 200 && res.data.message) {
                setErrMsg(res.data.message || res.statusText);
            } else {
                navigate('/?p=security', { replace: true });
            }
        }).catch(err => {
            setErrMsg('Connection error. Please try again later.');
            console.log('err', JSON.stringify(err));
        });

    };
    const onFinishFailed = () => {};


    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                name="oldpass"
                label="Old Password"
                rules={[
                    {
                      required: true,
                      message: 'Please input your old password!',
                    },
                  ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="newpass1"
                label="New Password"
                rules={[
                    {
                      required: true,
                      message: 'Please input your new password!',
                    },
                  ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="newpass2"
                label="New Repated"
                rules={[
                    {
                      required: true,
                      message: 'Please input your new password again!',
                    },
                  ]}
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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default ModalEditPass;    
