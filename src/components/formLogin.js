import React, { useState } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { userLogin } from '../services/auth';
import {
    Alert,
    Button,
    Form,
    Input
} from 'antd';

const StyledDiv  = styled.div`
    background: #090F44;
    margin: 0 auto;
    max-width: 500px;
    padding: 4vh;
    color: #fff;
    border: 1px solid #41C5FF;
    filter: drop-shadow(0 0 10px #41C5FF);
    border-radius: 5px;
    .ant-checkbox + span {
        color: #fff;
    }
    .ant-input, .ant-input-password {
        border-radius: 10px 0 10px 0;
    }
    .ant-btn {
        background: #41C5FF;
        filter: drop-shadow(0 0 5px #41C5FF);
        width: 80%;
        left: 50%;
        transform: translate(-50%, 0);
        height: 60px;
        border-radius: 20px 0 20px 0;
        font-size: 2rem;
    }
`;


function FormLogin(props) {
    const [errMsg, setErrMsg] = useState(null);
    
    const goLogin = async values => {
        const response = userLogin(values);
        return await response;
    };

    const onFinish = values => {
        setErrMsg(null);
        goLogin(values).then(res => {
            console.log('this is a response to login');
            if (res.status !== 200 && res.data.message) {
                setErrMsg(res.data.message || res.statusText);
            } else {
                console.log('we redirect now');
                navigate('/', { replace: true });
            }
        }).catch(err => {
            console.log('err', err)
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

  return (
    <StyledDiv>
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
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    </StyledDiv>
  )
}
export default FormLogin;