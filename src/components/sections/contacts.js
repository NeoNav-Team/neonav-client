import React, { useEffect, useState }from 'react';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { 
        Row,
        Col,
        Modal,
        Button
    } from 'antd';
import SpaceSuit from '../spaceSuit';
import Pane from '../pane';
import { modalFromLocation, stubFromSearch } from '../../utils/navigation';
import { getChatChannels } from '../../services/chat';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ModalEditChannel from '../modalEditChannel';
import ModalCreateChannel from '../modalCreateChannel';

const StyledP = styled.p`
    display:block;
    color: white;
    font-size: 2vh;
    line-height: 2.5vh;
    margin: 1vh 1.25vh;
    font-family: Roboto, sans-serif;
    font-weight: 100;
`;

const Styledlabel = styled.span`
    font-family: Orbitron, sans-serif;
    display: inline-block;
    min-width: 10vh;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 2vh;
    color: #00b8ff;
`;
const StyledValue = styled.span`
    display: inline-block;
    width: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const StyledBlurb = styled.span`
    margin-left: 1.5vh;
    display: block;
`;

const MiniIconBtn = styled.div`
    fontSize: '28px';
`;

const EditBtnHolder = styled.div`
    position: absolute;
    bottom: 1.75vh;
    right: 2vh;
`;

const StyledCol = styled(Col)`
    ${StyledP} {
        cursor: ${props => props.locked ? 'inherit' : 'pointer'};
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


export default function Contacts({ location }) {
    const userStub = <>Contacts</>;
    const defaultModal = modalFromLocation(location);
    const [modal, setModal] = useState(defaultModal);
    const [contacts, setChatContacts] = useState([]);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const closeModal = () => {
        setModal(null);
        navigate('/?p=channels');
    }

    const setProfileObjKey = objKey => {
        if(objKey !== 'create') {
            navigate(`/?p=channels&k=${objKey}#editChannel`);
        } else {
            navigate(`/?p=channels#createChannel`);
        }
    };

    const fetchChatChannels = async () => {
        const response = getChatChannels();
        return await response;
    };

    useEffect(() => {
        fetchChatChannels().then(res => {
            const myChannels = res.data;
            setChatContacts(myChannels);
        }).catch(err => {
            console.log('err', err);
        });
        setModal(modalFromLocation(location));
        console.log('contacts', contacts);
      }, [location]);

  return (
    <SpaceSuit>
        <Pane
            title={userStub}
            back={'/'}
            offset={isTabletOrMobile ? '128' : '160'}
            footer={
                <MiniIconBtn />
            }
        >
        <Row justify="space-between" align="middle">
            <StyledCol span={24}>
                Your momma
            </StyledCol>
        </Row>
        </Pane>
        <StyledModal
            title={null}
            visible={modal}
            closable={false}
            footer={null}
            onCancel={closeModal}
            bodyStyle={{padding:0, background:'transparent'}}
            width="75vh"
            >
            <Pane frameId={1}>
                { 
                // modal goes here
                }
            </Pane>
        </StyledModal>
    </SpaceSuit>
  )
}
