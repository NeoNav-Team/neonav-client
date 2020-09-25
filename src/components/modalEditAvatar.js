import React, { useState }from 'react';
import { navigate } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';
import { Alert, Upload, message } from 'antd';
import { updateProfile } from '../services/user';
import { formatDoc } from '../utils/format';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form
} from 'antd';

const StyledUpload = styled(Upload)`
    margin: 0 auto;
`;

function ModalEditAvatar() {
    const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
    const prevAvatar = _.get(profileData, 'profile.avatar', null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(prevAvatar);
    const [errMsg, setErrMsg] = useState(null);
    const [form] = Form.useForm();

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const goUpdate = async updates => {
        const response = updateProfile(updates);
        return await response;
    };

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleAction = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false);
                setImageUrl(imageUrl);
            });
        }
    };

    const onFinish = () => {
        const profile = profileData.profile;
        profile['avatar'] = imageUrl;
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
    const onFinishFailed = () => {};

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

    return (
        <>
            <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                <Form.Item label={'Avatar'}>
                    <StyledUpload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        customRequest={handleAction}
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </StyledUpload>
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
export default ModalEditAvatar;    
