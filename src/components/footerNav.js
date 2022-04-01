import React from 'react';
import styled from 'styled-components';
import Qrcode from './icons/qrcode';
import Scan from './icons/scan';
import IdCard from './icons/idCard';
import ButtonIcon from './buttonIcon';
import { getUser } from '../services/auth';
import { 
    Row,
    Col,
} from 'antd';

const StyledFooterDiv  = styled.div`
    display: block;
    background: transparent;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 96px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    button {
        left 50%;
        transform: translate(-50%, -50%);
    }
    .grid-container { width: 100%; position: absolute; bottom: 0; left: 0; }

    .grid-container:after { 
        -webkit-mask-image: -webkit-gradient(linear, left 90%, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
        mask-image: gradient(linear, left 90%, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
            transform: perspective(200px) rotateX(40deg) scale(2,1) translateZ(0);
        content: ""; display: block; position: absolute; bottom: 0; left: 0; right: 0; width: 100%; height: 30vh;
        padding: 1px; 
        -webkit-background-clip: content-box; 
        -webkit-backface-visibility: hidden;
        outline: 1px solid transparent;
        transform-origin: bottom center;
        will-change: transform; 
        background-position: center bottom;
        background-size: 40px 40px;
        background-image: 
        linear-gradient(to right, #7a04eb 2px, transparent 2px), 
        linear-gradient(to bottom, #7a04eb 1px, transparent 2px);
    }

    @media screen and (max-width: 900px) {
        height: 64px;
    }
`;

function FooterNav(props) {
    const nnUser = getUser();
    const userId = nnUser.userid;

    return (
        <StyledFooterDiv>
            <div className="grid-container" />

            <Row gutter={[18, 24]} justify="space-around" align="middle">
              <Col span={6}>
              <ButtonIcon
                        navTo='/?p=identification'
                        isEven="even"
                    >
                        <Scan fill={'#00b8ff'} />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon
                        navTo='/#myQRCode'
                    >
                        <Qrcode fill={'#00b8ff'} />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon
                        navTo={`/?p=identification&f=y&id=${userId}`}
                        isEven="even"
                    >
                        <IdCard fill={'#00b8ff'} />
                    </ButtonIcon>
              </Col>
            </Row>
        </StyledFooterDiv>
    )
}
export default FooterNav;