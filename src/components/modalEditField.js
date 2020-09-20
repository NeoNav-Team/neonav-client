import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import _ from 'lodash';
import {
    Alert,
    Button,
    Form,
    Input
} from 'antd';
import { updateProfile } from '../services/user';
import { formatDoc } from '../utils/format';

const labels = {
    firstname: 'Name',
    lastname: 'Name',
    username: 'Alias',
    status: 'Status',
    skills: 'Skills',
    occupation: 'Occupation',
    bio: 'bio'
};

function ModalEditField({fieldKey}) {
    const [errMsg, setErrMsg] = useState(null);
    const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
    const [form] = Form.useForm();
    const isName = fieldKey && fieldKey.includes('name');
    let value = _.get(profileData, `profile.${fieldKey}`, 'N/A');

    const goUpdate = async updates => {
        const response = updateProfile(updates);
        return await response;
    };

    const onFinish = values => {
        setErrMsg(null);
        const profile = profileData.profile;
        if (isName){
            profile['firstname'] = values.firstname;
            profile['lastname'] = values.lastname;
            profile['username'] = values.username;
        } else {
            profile[fieldKey] = values.editable;
        }
        const updates = formatDoc(profileData._id, profileData._rev,  {profile});
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

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if(isName) {
            form.setFieldsValue({
                firstname: profileData.profile.firstname,
                lastname: profileData.profile.lastname,
                username: profileData.profile.username,
            });
        } else {
            form.setFieldsValue({
                editable: value
            });
        }
    }, [form, value]);

  return (
    <>
        <p>{labels[fieldKey]}</p>
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {isName && 
                <>
                    <Form.Item
                    name="username"
                    label="Alias"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    name="firstname"
                    label="First"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    name="lastname"
                    label="Last"
                    >
                        <Input />
                    </Form.Item>
                </>
            }
            {!isName &&
                <Form.Item
                    name="editable"
                    >
                    <Input />
                </Form.Item>
            }
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
  )  
}
export default ModalEditField;    
