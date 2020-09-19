import React, { useEffect, useState }from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import Layout from '../layout';
import Pane from '../pane';
import UserAvatar from '../userAvatar';
import { userProfile } from '../../services/user';

const StyledP = styled.p`
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

export default function Profile() {
    const [profileData, setProfile] = useState({});
    const userId = _.get(profileData, 'auth.userid', '----------');
    const firstName = _.get(profileData, 'profile.firstname', 'N/A');
    const lastName = _.get(profileData, 'profile.lastname', 'N/A');
    const userName = _.get(profileData, 'profile.username', 'N/A');
    const status = _.get(profileData, 'profile.status', 'Available');
    const occupation = _.get(profileData, 'profile.occupation', 'N/A');
    const skills = _.get(profileData, 'profile.skills', 'N/A');
    const bio = _.get(profileData, 'profile.bio', 'N/A');
    const avatar =_.get(profileData, 'profile.avatar', null);
    const userStub = <>{userName}<span>#{userId}</span></>;


    const getProfile = async () => {
        const response = userProfile();
        return await response;
    };

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
            title={userStub}
            back={'/#userSettings'}
        >
        <Row justify="space-between" align="middle">
            <Col span={8}>
                <UserAvatar data={avatar} />
            </Col>
            <Col span={15}>
                <StyledP>
                    <Styledlabel>Name</Styledlabel>
                    <StyledValue>{lastName && `${lastName}, `}{firstName}</StyledValue>
                </StyledP>
                <StyledP>
                    <Styledlabel>Alias</Styledlabel>
                    <StyledValue>{userName}</StyledValue>
                </StyledP>
                <StyledP>
                    <Styledlabel>Status</Styledlabel>
                    <StyledValue>{status}</StyledValue>
                </StyledP>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <StyledP><Styledlabel>Occupation</Styledlabel></StyledP>
                <StyledP><StyledBlurb>{occupation}</StyledBlurb></StyledP>
                <StyledP><Styledlabel>Skills</Styledlabel></StyledP>
                <StyledP><StyledBlurb>{skills}</StyledBlurb></StyledP>
                <StyledP><Styledlabel>Bio</Styledlabel></StyledP>
                <StyledP><StyledBlurb>{bio}</StyledBlurb></StyledP>
            </Col>
        </Row>

        </Pane>
    </Layout>
  )
}
