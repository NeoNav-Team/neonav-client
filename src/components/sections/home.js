import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { getUser } from '../../services/auth';
import {modalFromLocation } from '../../utils/navigation';
import styled from 'styled-components';
import Logout from '../icons/logout';
import Notes from '../icons/notes';
import Kitty from '../icons/kitty';
import TanChat from '../icons/tanchat';
import Chat from '../icons/chat';
import Cash from '../icons/cash';
import Notify from '../icons/notify';
import Announcements from '../icons/announcements';
import Contacts from '../icons/contacts';
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
            <Row gutter={[18, 24]} justify="space-around" align="middle">
              <Col span={6}>
                  <ButtonIcon
                    navTo='/?p=chat'
                    title="tan / chat"
                  >
                      <TanChat />
                  </ButtonIcon>
                </Col>
                <Col span={6}>
                  <ButtonIcon
                    navTo='/?p=channels'
                    isEven="even"
                    title="Channels"
                  >
                      <Chat />
                  </ButtonIcon>
                </Col>
                <Col span={6}>
                  <ButtonIcon
                    navTo='/?p=cash'
                    title="CASH"
                  >
                      <Cash />
                  </ButtonIcon>
              </Col>
            </Row>
            <Row gutter={[18, 24]} justify="space-around" align="middle">
              <Col span={6}>
                  <ButtonIcon
                      navTo='/#kitty'
                      isEven="even"
                      title="Meow"
                    >
                        <Kitty />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                  <ButtonIcon
                      navTo="/?p=contacts"
                      title="Contacts"
                    >
                        <Contacts />
                    </ButtonIcon>
              </Col>
              <Col span={6}>
              <ButtonIcon
                  navTo='/?p=notes'
                  isEven="even"
                  title="Notes"
                >
                    <Notes />
                </ButtonIcon>
              </Col>
            </Row>
            <Row gutter={[18, 24]} justify="space-around" align="middle">
              <Col span={6}>
                  <ButtonIcon
                    navTo="/#userSettings"
                    title="User Settings"
                  >
                      <UserSettings />
                  </ButtonIcon>
                </Col>
              <Col span={6}>
                  <ButtonIcon
                    navTo="/?p=chat&c=22c6fec7b63257ca0d7b743946090fa9"
                    title="Anouncements"
                  >
                     <Announcements />
                  </ButtonIcon>
                </Col>
                <Col span={6}>
                <ButtonIcon
                    navTo="/?p=chat&c=d6993467030d7398f0415badd9186aa0"
                    title="Notifcations"
                  >
                     <Notify />
                </ButtonIcon>
              </Col>
            </Row>
            <Row gutter={[18, 24]} justify="space-around" align="middle">
                <Col span={6}>
                  <ButtonIcon
                    navTo='/logout'
                    isEven="even"
                    title="Exit"
                  >
                    <Logout />
                </ButtonIcon>
              </Col>
              <Col span={6}>

              </Col>
              <Col span={6}>

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
