import React, {useState} from 'react';
import _ from 'lodash';
import { QrReader } from 'react-qr-reader';
import styled from 'styled-components';
import { Popover } from 'antd';
import TinyForm from './tinyForm';
import { EditOutlined } from '@ant-design/icons';

const SyledDiv = styled.div`
    background: transparent;
    min-height: 64px;
`;

function PopoverInputField(props) {
    const {successHandler, label, data, type, children} = props;
    const [isVisible, setIsVisible] = useState(false);

    const clickHandler = visible => {
        setIsVisible(visible)
    }
    const closeOnSuccess = data => {
        setIsVisible(false);
        successHandler(data.data);
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    };
    
    return (
        <Popover
        overlayStyle={{position: 'absolute', top: '0px !important'}}
        content={
            <SyledDiv>
            {isVisible && (<TinyForm
               type={type}
               label={label || 'data'}
               data={data}
               successHandler={closeOnSuccess}
            />
            )}
            </SyledDiv>
        }
        trigger="click"
        visible={isVisible}
        placement="top"
        onVisibleChange={clickHandler}
        >
            {children ? children : (
                <EditOutlined style={{fontSize: '42px', width: '60px'}} />
            )}
        </Popover>
    )
}
export default PopoverInputField;    