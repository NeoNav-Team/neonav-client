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
                    <ButtonIcon
                        navTo='/?p=profile'
                        title='Profile'
                    >
                        <Profile />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon
                        navTo='/?p=security'
                        title='Account'
                        isEven="even"
                    >
                        <Security />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon
                        navTo='/#myQRCode'
                        title='Identification'
                    >
                        <Qrcode />
                    </ButtonIcon>
                </Col>
                <Col span={6} />
            </Row>
        </StyledAntLayout>
        </MenuPane>
  )
}
