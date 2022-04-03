import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import {
    Alert,
    Button,
    Form,
    Input
} from 'antd';
import { sendCash } from '../services/wallet';

function ModalPayCash(props) {
    const [errMsg, setErrMsg] = useState(null);
    const [form] = Form.useForm();
    const { r, a } = props;

    const onFinish = value => {
        if (!isNaN(value.amount)) {
            setErrMsg(null);
            sendCash(value).then(res => {
                if (res.status !== 200 && res.data.message) {
                    setErrMsg(res.data.message || res.statusText);
                } else {
                    navigate('/?p=cash', { replace: true });
                }
            }).catch(err => {
                setErrMsg('Connection error. Please try again later.');
                console.log('err', JSON.stringify(err));
            });
            form.resetFields();
        } else {
            setErrMsg('Please send a valid number.');  
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        form.resetFields();
    };


    useEffect(() => {
        form.setFieldsValue({
            ['recipient']: r,
            ['amount']: a
        });
    }, [r, a, form]);

    return (
    <>
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="recipient"
                label="Recipient ID"
                defau
            >
                <Input style={{textAlign: 'center', fontSize: '1.75em'}} />
            </Form.Item>
            <Form.Item
                name="amount"
                label="Amount"
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
                    Pay
                </Button>
            </Form.Item>
        </Form>
    </>
)   
}
export default ModalPayCash;    
