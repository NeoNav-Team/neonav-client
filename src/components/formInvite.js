import React, { useState } from 'react';
import { navigate } from 'gatsby';
import queryString from 'query-string';
import Pane from './pane';
import { userInvite } from '../services/auth';
import styled from 'styled-components';
import {
    Alert,
    Button,
    Form,
    Input,
    Typography
} from 'antd';

const { Title } = Typography;

const StyledForm = styled(Form)`
    margin-top: 4vh;
    & .ant-form-item-required {
        font-size: 2vh;
        line-height: 2vh;
        color: rgba(65, 197, 255, 0.7);
        filter: drop-shadow(0 0 3px #41c5ff);
    }
`;

const StyledTitle = styled(Title)`
    color: #41c5ff !important;
    filter: drop-shadow(0 0 3px #41c5ff);
    text-align:center;
`;

const Note = styled.p`
    text-align: center;
    color: white;
    font-size: 0.75rem;
`;

const Eula = styled.p`
    text-align: center;
    color: white;
    font-size: 10px;
    span {
        text-decoration: underline;
    }
`;

function FormInvite(props) {
    const {location} = props;
    const params = queryString.parse(location.search);
    const invite = params && params.id;

    const [errMsg, setErrMsg] = useState(null);
    
    const acceptInvite = async values => {
        const response = userInvite(values);
        return await response;
    };

    const onFinish = values => {
        setErrMsg(null);
        console.log('values', values);
        acceptInvite(values).then(res => {
            if (res.status !== 200 && res.data.message) {
                setErrMsg(res.data.message || res.statusText);
            } else {
                navigate('/', { replace: true });
            }
        }).catch(err => {
            setErrMsg('Connection error. Please try again later.');
            console.log('err', err)
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const viewEula = () => {
        navigate('/eula', { replace: true });
    }

  return (
    <>
    <Pane title="Invite">
        <StyledForm
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item name="invite" initialValue={invite}>
              <StyledTitle>{invite}</StyledTitle>
              <Input  style={{display: 'none'}}/>
            </Form.Item>
            <Form.Item
                name="email"
                label="Provide an email"
                rules={[{ required: true, message: 'Please input a valid email' }]}
            >
                <Input />
            </Form.Item>
            <Note>Email is not shared with third parties intentionally.</Note>
            <Form.Item
                name="password"
                label="Create a password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input />
            </Form.Item>
            <Note>Requires 10 characters with numbers and symbols.</Note>
            {errMsg && 
              <Form.Item>
                  <Alert message={errMsg} type="error" />
              </Form.Item>  
            }
            <Form.Item>
                <Eula onClick={viewEula}>By clicking below you accept our <span>EULA</span></Eula>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                Sign Up
                </Button>
            </Form.Item>
        </StyledForm>
    </Pane>
    </>
  )
}
export default FormInvite;