import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import {stubFromLocation } from '../utils/navigation';
import Pane from './pane';
import { userLogin } from '../services/auth';
import styled from 'styled-components';
import {
    Alert,
    Button,
    Form,
    Input,
    message
} from 'antd';

const RegisterBtn = styled.div`
    left: 15%;
    margin: 0 auto;
    height: 4vh;
    width: 70%;
    background-color: #ff00a0;
    color: #120458;
    cursor:pointer;
    text-align: center;
    line-height: 4.25vh;
    filter: drop-shadow(0 0 5px #ff00a0);
    background-image: linear-gradient(45deg, #ff00a0 25%, #000000 25%, #000000 50%, #ff00a0 50%, #ff00a0 75%, #000000 75%, #000000 100%);
    background-size: 2vh 2vh;
    & span {
        display:inline-block;
        border-radius: 2px;
        width:80%;
        height:100%;
        border-bottom: 1px solid #fe75fe;
        background-color: #ff00a0;
    }
    &:hover, &:active, &:selected, &:focus {
        color: #000;
        background-color: #ff00a0 !important;
        filter: drop-shadow(0 0 10px #ff00a0);
    }
`;

function FormLogin(props) {
    const {location} = props;
    console.log('location', location);
    const [errMsg, setErrMsg] = useState(null);
    
    const goLogin = async values => {
        const response = userLogin(values);
        return await response;
    };

    const onFinish = values => {
        setErrMsg(null);
        goLogin(values).then(res => {
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

    const setMessage = stub => {
        if (typeof stub !== 'undefined') {
            console.log('stub', stub);
            const messages = {
                'invalidToken': 'Your token is old or invalid. Please Login again.',
                'loggedOut': 'You have been logged out. Please Login again.',
                'changePass': 'Your password has been chsanged. Please Login again.',
                'newUser': 'Thank you for joining! Please login with your credentials.'
            };
            message.warning(messages[stub]);
        }
    }

    useEffect(() => {
        console.log('stubFromLocation(location)', stubFromLocation(location));
        setMessage(stubFromLocation(location));
    }, [location]);

  return (
    <>
    <Pane title="Login">
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            {errMsg && 
              <Form.Item>
                  <Alert message={errMsg} type="error" />
              </Form.Item>  
            }
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                Submit
                </Button>
            </Form.Item>
        </Form>
    </Pane>
    <RegisterBtn
        type="primary"
        onClick={() => {
            navigate('/register', { replace: true });
        }}
    >
    <span>☢  R E G I S T E R 	☢</span>
    </RegisterBtn>
    </>
  )
}
export default FormLogin;