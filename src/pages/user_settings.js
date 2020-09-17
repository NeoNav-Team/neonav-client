import React, { useEffect, useState }from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Layout from '../components/layout';
import HeaderBar from '../components/headerBar';
import MenuPane from '../components/menuPane';
import { Layout as AntLayout, Row, Col } from 'antd';
import ButtonIcon from '../components/buttonIcon';
import Profile from '../components/icons/profile';
import Security from '../components/icons/security';
import Pane from '../components/pane';

import { userProfile } from '../services/user';

const StyledAntLayout = styled(AntLayout)`
  &.ant-layout{
    background: transparent;
  }
`;

export default function UserSettings() {
    const [profileData, setProfile] = useState({});

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
        <HeaderBar>
            {_.get(profileData, 'profile.username', null)}<span>#{_.get(profileData, 'auth.userid', null)}</span>
        </HeaderBar>
        <MenuPane
            title={'User Settings'}
        >
            <StyledAntLayout>
            <Row gutter={[24, 24]}>
                <Col span={6}>
                    <ButtonIcon navTo='/profile'>
                        <Profile />
                    </ButtonIcon>
                </Col>
                <Col span={6}>
                    <ButtonIcon navTo='/security'>
                        <Security />
                    </ButtonIcon>
                </Col>
                <Col span={6} />
                <Col span={6} />
            </Row>
        </StyledAntLayout>
        </MenuPane>
        {/* <Pane title={'User profile'}>
            {_.get(profileData, 'profile', null) &&
                Object.entries(_.get(profileData, 'profile', [])).map((item, index) => {
                    return <StyledP key={`_profileItem_00${index}`}><label>{item[0]}</label><span>{item[1]}</span></StyledP>
                })
            }
        </Pane>
        <Pane title={'User Security'}>
            {_.get(profileData, 'auth', null) &&
                Object.entries(_.get(profileData, 'auth', [])).map((item,index) => {
                    return <StyledP key={`_profileItem_11${index}`}><label>{item[0]}</label><span>{item[1].toString()}</span></StyledP>
                })
            }
        </Pane> */}
    </Layout>
  )
}
