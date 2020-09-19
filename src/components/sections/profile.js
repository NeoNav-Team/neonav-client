import React, { useEffect, useState }from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import Layout from '../layout';
import Pane from '../pane';
import UserAvatar from '../userAvatar';
import { userProfile } from '../../services/user';
import Lock from '../icons/lock';
import Unlock from '../icons/unlock';
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

export default function Profile() {
    const [profileData, setProfile] = useState({});
    const [locked, setLock] = useState(true);
    const [hasFetched, setFetch] = useState(false);
    const [selected, setSelected] = useState(null);
    const userId = _.get(profileData, 'auth.userid', '----------');
    const firstName = _.get(profileData, 'profile.firstname', 'N/A');
    const lastName = _.get(profileData, 'profile.lastname', 'N/A');
    const userName = _.get(profileData, 'profile.username', 'N/A');
    const status = _.get(profileData, 'profile.status', 'Available');
    const occupation = _.get(profileData, 'profile.occupation', 'N/A');
    const skills = _.get(profileData, 'profile.skills', 'N/A');
    const bio = _.get(profileData, 'profile.bio', 'N/A');
    const avatar =_.get(profileData, 'profile.avatar', null);


    const getProfile = async () => {
        const response = userProfile();
        return await response;
    };

    const toggleLock = () => {
        setLock(!locked);
    };

    const setProfileObjKey = objKey => {
        setSelected(objKey);
        console.log('selected', selected);
    };

    useEffect(() => {
        getProfile().then(res => {
            setProfile(res.data);
            setFetch(true);
        }).catch(err => {
            console.log('err', err);
        });
    }, []);

    const userStub = <>{userName}<span>#{userId}</span></>;
    const EBtn = ({ objKey }) => (!locked && <EditOutlined style={{cursor: 'pointer', opacity: 0.6}}/>);

  return (
    <Layout>
        <Pane
            title={userStub}
            back={'/#userSettings'}
        >
        <Row justify="space-between" align="middle">
            <Col span={8}>
                <UserAvatar data={avatar} alt={userName} />
            </Col>
            <Col span={15}>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'fullName') })}>
                    <Styledlabel>Name</Styledlabel>
                    <StyledValue>{lastName && `${lastName}, `}<EBtn />{firstName}<EBtn /></StyledValue>
                </StyledP>
                <StyledP {...(!locked && { onClick: _.partial(setProfileObjKey, 'userName') })}>
                    <Styledlabel>Alias</Styledlabel>
                    <StyledValue>{userName}<EBtn /></StyledValue>
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
    </Layout>
  )
}
