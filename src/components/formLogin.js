import React from 'react';
import styled from 'styled-components';
import { userLogin } from '../services/auth';
import { Form, Input, Button, Checkbox } from 'antd';

const StyledDiv  = styled.div`
    background: #090F44;
    margin: 0 auto;
    max-width: 500px;
    padding: 4vh;
    color: #fff;
    .ant-checkbox + span {
        color: #fff;  
    }
`;


function FormLogin(props) {
    
    const onFinish = values => {
        console.log('FINISHED FILLIN OUT MAH FORM');
        console.log(`userLogin(${JSON.stringify(values)})`);
        userLogin(values);
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

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

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