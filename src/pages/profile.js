import React, { useEffect, useState }from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Layout from '../components/layout';
import HeaderBar from '../components/headerBar';
import Pane from '../components/pane';
import { userProfile } from '../services/user';

const StyledP = styled.p`
    font-size: 1rem;
    color: #ffffff;
    label {
        margin-right: 1rem;
        font-size: 1.125rem;
    }
`;

export default function Profile() {
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
        <Pane>
            {_.get(profileData, 'profile', null) &&
                Object.entries(_.get(profileData, 'profile', [])).map((item, index) => {
                    return <StyledP key={`_profileItem_00${index}`}><label>{item[0]}</label><span>{item[1]}</span></StyledP>
                })
            }
        </Pane>
        <Pane>
            {_.get(profileData, 'auth', null) &&
                Object.entries(_.get(profileData, 'auth', [])).map((item,index) => {
                    return <StyledP key={`_profileItem_11${index}`}><label>{item[0]}</label><span>{item[1].toString()}</span></StyledP>
                })
            }
        </Pane>
    </Layout>
  )
}
