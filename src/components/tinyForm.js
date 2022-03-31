import React from 'react';
import styled from 'styled-components';
import {
  Input,
  Select,
  Form
} from 'antd';
import { RightSquareOutlined } from '@ant-design/icons';

const { Option } = Select;

const StyledDiv = styled.div`
  background: transparent;
  margin: 0 auto;
  filter: drop-shadow(0px 0px 5px #7a04eb);
  padding: 1.5vh;
  .pitch-mixin {
    --aug-tr: 25px;
    --aug-b-extend1: 50%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 50% 50% / 100% 100%;
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(#7a04eb, #120458)  50% 50% / 100% 100%;
    --aug-inlay-opacity: 0.5;
  }
  color: white;
`;


const SubmitDiv = styled.button`
  font-size: 24px;
  line-height: 28px;
  border: 1px solid #40C5FF;
  background-color: #40C5FF;
  margin-left: 10px;
  height: 32px;
  width: 42px;
  border-radius: 5px;
  cursoer: pointer;
`;

export default function TinyForm(props) {
  const { data, label, name, type, successHandler } = props;
  const [form] = Form.useForm();

  const inputFieldbyType  = (type, data) =>{
    let element = null;
    switch (type) {
      case 'select':
        element =  (
          <Select key={`select_${label}`}>
            {data && data.map((item, index) => {
              return <Option key={`item_${label}_${index}`} value={item.value}>{item.name}</Option>
              }
            )}
          </Select>
        );
      break;
      default:
        element =  <Input />;
      break;
    }
    return element;
  }

  return (
        <StyledDiv
            title={ label || 'FORM DATA REQUIRED'}
        >
          <Form
            form={form}
            onFinish={successHandler}
          >
            <Form.Item
              style={{padding: 0, margin: 0, width: 'calc(100% - 64px)', display: 'inline-block'}}
              name={`${name || label || 'itemValue'}`}
            >
              {inputFieldbyType(type, data)}
            </Form.Item>
            <Form.Item
              style={{padding: 0, margin: 0, width: '64px', display: 'inline-block'}}
            >
              <SubmitDiv type="primary" htmlType="submit">
                <RightSquareOutlined />
              </SubmitDiv>
            </Form.Item>
          </Form>
        </StyledDiv>
  )
}
