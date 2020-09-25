import React, { useState }from 'react';
import { navigate } from 'gatsby';
import { Alert } from 'antd';
import { updateProfile } from '../services/user';
import { formatDoc } from '../utils/format';
import {
    Button,
    Form
} from 'antd';


function ModalEditPass() {
    const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
    const [errMsg, setErrMsg] = useState(null);
    const [form] = Form.useForm();

    const goUpdate = async updates => {
        const response = updateProfile(updates);
        return await response;
    };

    const onFinish = () => {
        const auth = profileData.auth;
        const updates = formatDoc(profileData._id, profileData._rev,  {auth});
        goUpdate(updates).then(res => {
            if (res.status !== 200 && res.data.message) {
                setErrMsg(res.data.message || res.statusText);
            } else {
                console.log('200 res', res);
                navigate('/?p=profile', { replace: true });
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
                <Form.Item label={'Avatar'}>
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
