import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Pane from './pane';
import { userRegister } from '../services/auth';
import styled from 'styled-components';
import {
    Alert,
    Button,
    Form,
    Input
} from 'antd';

const StyledForm = styled(Form)`
    .ant-form-item {
        color: white;
        font-size: 0.75rem;
    }
    .ant-form-item-required {
        color: white;
        min-width: 30%;
    }
`;
const Note = styled.p`
    text-align: center;
    color: white;
    font-size: 0.75rem;
`;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

function FormRegister(props) {
    const [errMsg, setErrMsg] = useState(null);
    
    const goRegister = async values => {
        const response = userRegister(values);
        return await response;
    };

    const onFinish = values => {
        setErrMsg(null);
        goRegister(values).then(res => {
            if (res.status !== 200 && res.data.message) {
                setErrMsg(res.data.message || res.statusText);
            } else {
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
    <>
    <Pane title="REGISTER">
        <StyledForm
            {...layout}
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                name="email"
                label="EMAIL"
                key="njio8"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>
            <Note>Email is not shared with third parties intentionally.</Note>
            <Form.Item
                name="password"
                label="PASSWORD"
                key="rfe2c"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input />
            </Form.Item>
            <Note>Requires 10 characters with numbers and symbols.</Note>
            {errMsg && 
              <Form.Item {...tailLayout}>
                  <Alert message={errMsg} type="error" />
              </Form.Item>  
            }
            <Form.Item {...tailLayout}>
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
export default FormRegister;