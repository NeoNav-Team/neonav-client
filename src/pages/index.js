import React, { useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Layout from '../components/layout';
import Logout from '../components/icons/logout';
import Kitty from '../components/icons/Kitty';
import { 
  Layout as AntLayout,
  Row,
  Col,
  Modal
} from 'antd';
import HeaderBar from '../components/headerBar';
import ButtonIcon from '../components/buttonIcon';

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

export default function Home() {
  const [modal, setModal] = useState(null);

  const closeModal = () => {
    setModal(null);
  }

  const openModal = modalName => {
    setModal(modalName);
  }

  return (
    <Layout>
      <HeaderBar noMenu={'true'}>
          N  E O N A V
      </HeaderBar>
      <StyledAntLayout>
          <Row gutter={[24, 24]}>
            <Col span={6} >
              <ButtonIcon navTo='/logout'>
                <Logout />
              </ButtonIcon>
            </Col>
            <Col span={6} >
              <div
                onClick={_.partial(openModal, 'kitty')}
              >
                <Kitty/>
              </div>
              <StyledModal
              title={null}
              visible={modal === 'kitty'}
              onCancel={closeModal}
              bodyStyle={{padding:0, background:'transparent'}}
              footer={null}
              width="75vh"
              >
                <iframe width="100%" id="video1" height="320" src="https://www.youtube-nocookie.com/embed/5sNuDu4dE8Y?controls=1&wmode=opaque&autohide=1&autoplay=1&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </StyledModal>
            </Col>
            <Col span={6} />
            <Col span={6} />
          </Row>
      </StyledAntLayout>
    </Layout>
  )
}
