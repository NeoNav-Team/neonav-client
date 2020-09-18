import React, { useEffect, useState }from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Layout from '../layout';
import Pane from '../pane';

import { userProfile } from '../../services/user';

const StyledP = styled.p`
    color: white;
    font-size: 1em;
    label {
        display: inline-block;
        width: 30%;
        opacity: 0.5;
    }
    span {
        display: inline-block;
        width: 70%;
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
        <Pane
            title={'User Security'}
            back={'/#userSettings'}
        >
            {_.get(profileData, 'profile', null) &&
                Object.entries(_.get(profileData, 'auth', [])).map((item, index) => {
                    return <StyledP key={`_profileItem_01${index}`}><label>{item[0]}</label><span>{item[1].toString()}</span></StyledP>
                })
            }
        </Pane>
    </Layout>
  )
}
