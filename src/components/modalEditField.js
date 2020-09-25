import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import _ from 'lodash';
import {
    Alert,
    Button,
    Form,
    Input,
    Select
} from 'antd';
import { updateProfile } from '../services/user';
import { formatDoc } from '../utils/format';
import { statusIcons } from '../constants/defaults';

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
    const isStatus = fieldKey && fieldKey === 'status';
    const isLong = fieldKey && fieldKey === 'bio';
    const isInput = !isName && !isStatus;
    let value = _.get(profileData, `profile.${fieldKey}`, 'N/A');
    let firstname = _.get(profileData, `profile.firstname`, 'N/A');
    let lastname = _.get(profileData, `profile.lastname`, 'N/A');
    let username = _.get(profileData, `profile.username`, 'N/A');

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
                firstname,
                lastname,
                username,
            });
        } else {
            form.setFieldsValue({
                editable: value
            });
        }
    }, [
        isName,
        firstname,
        lastname,
        username,
        form, 
        value]);

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
            {isStatus &&
            <Form.Item name="editable">
                <Select>
                    <Select.Option value="available">{statusIcons['available']} Available</Select.Option>
                    <Select.Option value="away">{statusIcons['away']} Away</Select.Option>
                    <Select.Option value="busy">{statusIcons['busy']} Busy</Select.Option>
                    <Select.Option value="arriving">{statusIcons['arriving']} Arriving</Select.Option>
                    <Select.Option value="en_route">{statusIcons['en_route']} En Route</Select.Option>
                    <Select.Option value="departing">{statusIcons['departing']} Departing</Select.Option>
                </Select>
              </Form.Item>
            }
            {isInput &&
                <Form.Item
                    name="editable"
                    >
                    {isLong ? <Input.TextArea rows={5} /> : <Input />}
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
