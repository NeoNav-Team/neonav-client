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
    firstname: 'First Name',
    lastname: 'Last Name',
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
    let value = _.get(profileData, `profile.${fieldKey}`, 'N/A');

    const goUpdate = async updates => {
        const response = updateProfile(updates);
        return await response;
    };

    const onFinish = values => {
        setErrMsg(null);
        const profile = profileData.profile;
        profile[fieldKey] = values.editable;
        console.log('profile', profile);
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
        form.setFieldsValue({
            editable: value
          });
    }, [form, value]);

  return (
    <>
        <p>{labels[fieldKey]}</p>
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
        <Form.Item
            name="editable"
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
  )  
}
export default ModalEditField;    
