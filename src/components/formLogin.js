import React from 'react';
import styled from 'styled-components';
import userLogin from '../services/auth';
import { Form, Input, Button, Checkbox } from 'antd';

const StyledForm  = styled.form`
    background: #090F44;
    padding: 2vh;
    color: #fff;
    .ant-checkbox + span {
        color: #fff;  
    }
`;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

function FormLogin(props) {
    
    const onFinish = values => {
        console.log(`userLogin(${values})`);
        userLogin(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

  return (
    <StyledForm>
        <Form
            {...layout}
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

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    </StyledForm>
  )
}
export default FormLogin;