import React from 'react';
import styled from 'styled-components';
import MenuPane from './menuPane';
import { Layout as AntLayout, Row, Col } from 'antd';
import ButtonIcon from './buttonIcon';
import Profile from './icons/profile';
import Security from './icons/security';
import Qrcode from './icons/qrcode';

const StyledAntLayout = styled(AntLayout)`
  &.ant-layout{
    background: transparent;
  }
`;

export default function MenuUserSettings() {
  return (
        <MenuPane
            title={'User Settings'}
        >
            <StyledAntLayout>
            <Row gutter={{ xs: 0, sm: 0, md: 0, lg: 24 }}>
                <Col span={6}>
                    <ButtonIcon width="100%" style={{width:'100%', border:'1px solid red'}} navTo='/?p=profile'>
                        <Profile />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon navTo='/?p=security'>
                        <Security />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon navTo='/#myQRCode'>
                        <Qrcode />
                    </ButtonIcon>
                </Col>
                <Col span={6} />
            </Row>
        </StyledAntLayout>
        </MenuPane>
  )
}