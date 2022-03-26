import React, { useState } from 'react';
import { navigate } from 'gatsby';
import {
    Alert,
    Button,
    Form,
    Input
} from 'antd';

function ModalPayCash(props) {
    const [errMsg, setErrMsg] = useState(null);
    const [form] = Form.useForm();
    const { userId, qrSetter, a } = props;

    const onFinish = value => {
        setErrMsg(null);
        qrSetter(`/?p=cash&r=${userId}&a=${value.amount}#payCash`)
        navigate(`/?p=cash#myQRCode`);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
    <>
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                amount: a || null,
              }}
        >
            <Form.Item
                name="amount"
                label="amount"
            >
                <Input style={{textAlign: 'center', fontSize: '1.75em'}} />
            </Form.Item>
            {errMsg && 
              <Form.Item>
                  <Alert message={errMsg} type="error" />
              </Form.Item>  
            }
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Request
                </Button>
            </Form.Item>
        </Form>
    </>
)   
}
export default ModalPayCash;    
