import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import _ from 'lodash';
import { getUser } from '../../services/auth';
import CashProfile from '../../components/cashProfile';
import CashActions from '../../components/cashActions';
import CashHistory from '../../components/cashHistory';
import ModalPayCash from '../../components/modalPayCash';
import ModalRquestCash from '../../components/modalRequestCash';
import ModalQRCode from '../../components/modalQRCode';
import { 
  userWallet,
  userWalletHistory
} from '../../services/wallet';
import Pane from '../pane';
import { useWindowDimensions } from '../../utils/responsive';
import { modalFromLocation, stubFromSearch } from '../../utils/navigation';
import { Modal } from 'antd';

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

  const nnUser = getUser();
  const userId = nnUser.userid;

  const [balance, setBalance] = useState(null);
  const [history, setHistory] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [modal, setModal] = useState(null);

  const closeModal = () => {
      setModal(null);
      navigate('/?p=cash');
  }
  const qrSetter = qrcode => {
    navigate('/?p=cash#qrCash');
    setQrCode(qrcode);
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
    setBalance(balance);
    setHistory(history);
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
     <CashActions userId={userId} />
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
            {modal === 'payCash' && <ModalPayCash r={stubFromSearch(location, 'r')} a={stubFromSearch(location, 'a')} />}
            {modal === 'requestCash' && <ModalRquestCash a={stubFromSearch(location, 'a')} qrSetter={qrSetter} />}
            {modal === 'myQRCode' && <ModalQRCode value={qrCode} />}
           </Pane>
      </StyledModal>
    </>
  )
}
