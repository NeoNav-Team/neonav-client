import React, {useState} from 'react';
import _ from 'lodash';
import { QrReader } from 'react-qr-reader';
import styled from 'styled-components';
import { Popover } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

const SyledDiv = styled.div`
    background: black;
    min-width: 300px;
    min-height: 300px;
`;

function PopoverQRReader(props) {
    const {successHandler, children} = props;
    const [isVisible, setIsVisible] = useState(false);

    const clickHandler = visible => {
        setIsVisible(visible)
        if (!isVisible) {
            const localstream = _.get(window, 'localstream', null);
            localstream && localstream.getTracks().forEach(track => track.stop());
        }
    }

    return (
        <Popover
        content={
            <SyledDiv>
            {isVisible && (<QrReader
                delay={300}
                constraints={{facingMode: 'environment'}}
                onResult={(result, error) => {
                if (!!result) {
                    setIsVisible(false);
                    let cleanId = result?.text;
                    cleanId = cleanId.replace(/[^0-9\.]+/g, '');
                    successHandler(cleanId);
                }
                if (!!error) {
                    console.info(error);
                }
                }}
            />
            )}
            </SyledDiv>
        }
        trigger="click"
        visible={isVisible}
        placement="top"
        onVisibleChange={clickHandler}
        >
            {children ? children : <QrcodeOutlined style={{fontSize: '42px', width: '60px'}} />}
        </Popover>
    )
}
export default PopoverQRReader;    