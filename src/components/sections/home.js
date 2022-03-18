import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { getUser } from '../../services/auth';
import {modalFromLocation } from '../../utils/navigation';
import styled from 'styled-components';
import Logout from '../icons/logout';
import Kitty from '../icons/kitty';
import Chat from '../icons/chat';
import MenuUserSettings from '../menuUserSettings';
import { 
    Layout as AntLayout,
    Row,
    Col,
    Modal
  } from 'antd';
import ButtonIcon from '../buttonIcon';
import UserSettings from '../icons/userSettings';
import ModalKitty from '../modalKitty';
import ModalQRCode from '../modalQRCode';

const StyledAntLayout = styled(AntLayout)`
  &.ant-layout{
    background: transparent;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background:transparent;
  }
  .ant-modal-close-x {
    margin-top: -50px;
    color:#ff00a0;
    filter: drop-shadow(0 0 8px #ff00a0);
  }
`;

export default function Home({ location }) {
    const nnUser = getUser();
    const userId = nnUser.userid;
    const defaultModal = modalFromLocation(location);
    const [modal, setModal] = useState(defaultModal);

    const closeModal = () => {
        setModal(null);
        navigate('/');
    }

    useEffect(() => {
        setModal(modalFromLocation(location))
    }, [location]);

  return (
      <>
        <StyledAntLayout>
            <Row gutter={[24, 24]}>
            <Col span={6}>
                    <ButtonIcon
                      navTo='/?p=chat'
                      title="谈 | tan | chat"
                    >
                        <Chat />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon
                      navTo='/#kitty'
                      isEven="even"
                      title="Meow"
                    >
                        <Kitty />
                    </ButtonIcon>
                </Col>
                <Col span={6} >
                    <ButtonIcon
                      navTo="/#userSettings"
                      title="User Settings"
                    >
                        <UserSettings />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                <ButtonIcon
                  navTo='/logout'
                  isEven="even"
                  title="Exit"
                >
                    <Logout />
                </ButtonIcon>
                </Col>
            </Row>
        </StyledAntLayout>
        <StyledModal
            title={null}
            visible={modal}
            closable={false}
            onCancel={closeModal}
            bodyStyle={{padding:0, background:'transparent'}}
            footer={null}
            width="75vh"
            >
                {modal === 'myQRCode' && <ModalQRCode value={userId} />}
                {modal === 'kitty' && <ModalKitty />}
                {modal === 'userSettings' && <MenuUserSettings />}
            </StyledModal>
      </>
  )
}
