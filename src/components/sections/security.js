import React, { useEffect, useState }from 'react';
import { modals }  from '../../constants/defaults';
import _ from 'lodash';
import { navigate } from 'gatsby';
import queryString from 'query-string';
import styled from 'styled-components';
import Layout from '../layout';
import Pane from '../pane';
import ModalEditField from '../modalEditField';
import ModalEditPass from '../modalEditPass';
import Lock from '../icons/lock';
import Unlock from '../icons/unlock';
import { EditOutlined } from '@ant-design/icons';
import { 
    Row,
    Col,
    Modal
} from 'antd';

import { userProfile } from '../../services/user';


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

const StyledLink = styled.span`
    font-family: Orbitron, sans-serif;
    display: inline-block;
    min-width: 10vh;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 2vh;
    color: #fe75fe;
    opacity: 0.8;
    cursor: pointer;
`;

const MiniIconBtn = styled.div`
    cursor: pointer;
    fill: #fff;
    svg {
        opacity: 0.5;
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


export default function Profile({ location }) {
    const [profileData, setProfile] = useState({});
    const [locked, setLock] = useState(true);
    const stubFromLocation = location => {
        const stub = location.hash.replace('#', '');
        return modals.includes(stub) ? stub : null;
    };
    const stubFromSearch = location => {
        const params = queryString.parse(location.search);
        return params.k;
    };
    const defaultModal = stubFromLocation(location);
    const [modal, setModal] = useState(defaultModal);

    const getProfile = async () => {
        const response = userProfile();
        return await response;
    };
    const toggleLock = () => {
        setLock(!locked);
    };
    const closeModal = () => {
        setModal(null);
        navigate('/?p=profile');
    }

    useEffect(() => {
        getProfile().then(res => {
            setProfile(res.data);
        }).catch(err => {
            console.log('err', err);
        });
    }, []);

  return (
    <Layout>
        <Pane
            title={'User Security'}
            back={'/#userSettings'}
        >
            <Row>
                <Col span={24}>
                    {_.get(profileData, 'profile', null) &&
                        Object.entries(_.get(profileData, 'auth', [])).map((item, index) => {
                            return (
                                <StyledP key={`_profileItem_01${index}`}>
                                    <Styledlabel>{item[0]}</Styledlabel>
                                    <StyledValue>{item[1].toString()}</StyledValue>
                                </StyledP>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col span={14}>
                    {!locked && <StyledP onClick={_.partial(setModal, 'editPass')}><StyledLink>CHANGE PASSWORD<EditOutlined style={{cursor: 'pointer', lineHeight: '2vh', opacity: 0.6}}/></StyledLink></StyledP>}
                </Col>
                <Col span={6}>
                </Col>
                <Col span={2}>
                </Col>
                <Col span={2}>
                    <MiniIconBtn onClick={toggleLock}>
                        {locked ? <Lock /> : <Unlock />}
                    </MiniIconBtn>
                </Col>
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
                {modal === 'editField' && <ModalEditField fieldKey={stubFromSearch(location)} />}
                {modal === 'editPass' && <ModalEditPass />}
            </Pane>
        </StyledModal>
    </Layout>
  )
}
