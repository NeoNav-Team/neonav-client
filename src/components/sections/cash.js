import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import _ from 'lodash';
import CashProfile from '../../components/cashProfile';
import CashActions from '../../components/cashActions';
import CashHistory from '../../components/cashHistory';
import ModalPayCash from '../../components/modalPayCash';
import { 
  userWallet,
  userWalletHistory
} from '../../services/wallet';
import Pane from '../pane';
import { useWindowDimensions } from '../../utils/responsive';
import { modalFromLocation } from '../../utils/navigation';
import { Modal, Typography } from 'antd';

const { Text } = Typography;

const StyledChatContainer = styled.div`
  background: transparent;
  align: left;
  margin: 0 auto 16px;
  padding: 0;
  overflow: hidden;
  position: relative;
  min-height: 100%;
  &.pitch-mixin {
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0.125))  50% 50% / 100% 100%;
    --aug-inlay-opacity: 0.5;
  }
`;

const User = styled(Text)`
  color: #41c5ff;
  font-weight: 300;
  margin-left: 10px;
  font-size: 12px
`;

const StyledChatMessageLabel = styled.div`
  font-size: 10px;
  padding: 2px;
  width: 70vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
  }
`;

const StyledChatMessageText = styled.div`
  font-size: 12px;
  padding: 10px;
  min-width: 70vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #41c5ff, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#41c5ff, #41c5ff) 100% 100% / 100% 100%;
  }
`;


const StyledModal = styled(Modal)`
  .ant-modal-content {
    background:transparent;
    box-shadow: none;
    color: #fff;
  }
  .ant-modal-close-x {
    margin-top: -50px;
    color:#ff00a0;
    filter: drop-shadow(0 0 8px #ff00a0);
  }
  .ant-modal-footer {
    border: 0;
    padding: 0;
    filter: drop-shadow(0px 0px 5px #00b8ff);
    &:hover {
        filter: drop-shadow(0px 0px 10px #00b8ff);
    }
  }
  .ant-btn {
    clip-path: polygon(0% 15%, 15% 7%, 15% 0%, 85% 0%, 85% 7%, 100% 15%, 100% 85%, 85% 93%, 85% 100%, 15% 100%, 15% 93%, 0% 85%);
    color: #fff;
    background-color: #120458;
    border: 0;
    width: 20vh;
    }
    .ant-btn-primary {
        background-color: #00b8ff;
    }
    .ant-form-item-label {
        label {
            color: #fff;
            font-size: 3vh;
        }
    }
`;


export default function Cash({ location }) {
  // sizing values
  const { height } = useWindowDimensions();
  const headerBarHeight = 64
  const chashActionsHeight = 160;
  const cashHistoryBoxHeight = height - headerBarHeight - chashActionsHeight;

  const [balance, setBalance] = useState(null);
  const [history, setHistory] = useState([]);

  const [modal, setModal] = useState(null);

  const closeModal = () => {
      setModal(null);
      navigate('/?p=cash');
  }

  const fetchCash = async () => {
    const wallet = userWallet();
    const history = userWalletHistory();
    
    return Promise.all([wallet, history]).then((values) => {
      return values;
    });
  }

  const setInitalStateFromResponse = (res) => {
    const balance = _.get(res[0], 'data.balance', 0);
    const history = _.get(res[1], 'data', []);
    console.log('res[1]',res[1]);
    setBalance(balance);
    setHistory(history);
  }

  const goPay = () => {

  }

  useEffect(() => {
    fetchCash().then(res => {
      setInitalStateFromResponse(res);
    }).catch(err => {
        console.log('err', err);
    });
    console.log('modalFromLocation(location)', modalFromLocation(location));
    setModal(modalFromLocation(location));
  }, [location]);

  return (
    <>
    <StyledChatContainer className="pitch-mixin" data-augmented-ui="tl-clip-x tr-rect-x bl-clip br-clip border">
     <CashProfile balance={balance} />
     <CashActions />
     <CashHistory height={cashHistoryBoxHeight} history={history} />
    </StyledChatContainer>
    <StyledModal
        title={null}
        visible={modal}
        closable={false}
        onCancel={closeModal}
        bodyStyle={{padding:0, background:'transparent'}}
        footer={null}
        width="75vh"
        >
          <Pane frameId={1}>
            {modal === 'payCash' && <ModalPayCash />}
           </Pane>
      </StyledModal>
    </>
  )
}
