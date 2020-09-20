import React, { useEffect, useState }from 'react';
import { modals }  from '../../constants/defaults';
import _ from 'lodash';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { 
        Row,
        Col,
        Modal
    } from 'antd';
import Layout from '../layout';
import Pane from '../pane';
import UserAvatar from '../userAvatar';
import { userProfile } from '../../services/user';
import Lock from '../icons/lock';
import Unlock from '../icons/unlock';
import ModalEditField from '../modalEditField';
import { EditOutlined } from '@ant-design/icons';



const StyledP = styled.p`
    display:block;
    color: white;
    font-size: 1.6vh;
    line-height: 1.8vh;
    margin: 1vh 0;
    span {
        display: inline-block;
        width: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const Styledlabel = styled.span`
    display: inline-block;
    min-width: 10vh;
    opacity: 0.5;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    display: inline-block;
    width: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
`;


export default function Profile({ location }) {
    const [profileData, setProfile] = useState({});
    const [locked, setLock] = useState(true);
    const userId = _.get(profileData, 'auth.userid', '----------');
    const firstname = _.get(profileData, 'profile.firstname', 'N/A');
    const lastname = _.get(profileData, 'profile.lastname', 'N/A');
    const username = _.get(profileData, 'profile.username', 'N/A');
    const status = _.get(profileData, 'profile.status', 'Available');
    const occupation = _.get(profileData, 'profile.occupation', 'N/A');
    const skills = _.get(profileData, 'profile.skills', 'N/A');
    const bio = _.get(profileData, 'profile.bio', 'N/A');
    const avatar =_.get(profileData, 'profile.avatar', null);
    const stubFromLocation = location => {
        const stub = location.hash.replace('#', '');
        return modals.includes(stub) ? stub : null;
    };
    const stubFromSearch = location => {
        return location.search.split('=').pop();
    };
    const defaultModal = stubFromLocation(location);
    const [modal, setModal] = useState(defaultModal);

    const closeModal = () => {
        setModal(null);
        navigate('/profile');
    }

    const getProfile = async () => {
        const response = userProfile();
        return await response;
    };

    const toggleLock = () => {
        setLock(!locked);
    };

    const setProfileObjKey = objKey => {
        navigate(`/profile?key=${objKey}#editField`);
    };

    useEffect(() => {
        setModal(stubFromLocation(location))
    }, [location]);

    useEffect(() => {
        getProfile().then(res => {
            setProfile(res.data);
            console.log('res.data', JSON.stringify(res.data));
            localStorage.setItem('profileData', JSON.stringify(res.data));
        }).catch(err => {
            console.log('err', err);
        });
    }, []);

    const userStub = <>{username}<span>#{userId}</span></>;
    const EBtn = ({ objKey }) => (!locked && <EditOutlined style={{cursor: 'pointer', opacity: 0.6}}/>);

  return (
    <Layout>
        <Pane
            title={userStub}
            back={'/#userSettings'}
        >
        <Row justify="space-between" align="middle">
            <Col span={8}>
                <UserAvatar data={avatar} alt={username} />
            </Col>
            <Col span={15}>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'fullname') })}>
                    <Styledlabel>Name</Styledlabel>
                    <StyledValue>{lastname && `${lastname}, `}<EBtn />{firstname}<EBtn /></StyledValue>
                </StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'username') })}>
                    <Styledlabel>Alias</Styledlabel>
                    <StyledValue>{username}<EBtn /></StyledValue>
                </StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'status') })}>
                    <Styledlabel>Status</Styledlabel>
                    <StyledValue>{status}<EBtn /></StyledValue>
                </StyledP>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'occupation')})}><Styledlabel>Occupation</Styledlabel></StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'occupation')})}><StyledBlurb>{occupation}<EBtn /></StyledBlurb></StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'skills')})}><Styledlabel>Skills</Styledlabel></StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'skills')})}><StyledBlurb>{skills}<EBtn /></StyledBlurb></StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'bio')})}><Styledlabel>Bio</Styledlabel></StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'bio')})}><StyledBlurb>{bio}<EBtn /></StyledBlurb></StyledP>
            </Col>
        </Row>
        <Row>
            <Col span={14}>
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
            </Pane>
        </StyledModal>
    </Layout>
  )
}
