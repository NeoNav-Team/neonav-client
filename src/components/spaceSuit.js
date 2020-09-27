import React, {useEffect, useState }from 'react';
import { withPrefix } from 'gatsby';
import {Helmet} from 'react-helmet';
import { navigate } from 'gatsby';
import { logout, validateToken } from '../services/auth';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        height: 100%;
        color: #0EBCC6;
        min-height: 100vh;
        max-height: 100vh;
        min-width: 100vw;
        font-family: 'Orbitron', sans-serif;
        overflow: hidden;
        background-color: #120458;
        background-image: 
            radial-gradient(rgba(18, 4, 88, 0), rgba(18, 4, 88, 1)),
            linear-gradient(rgba(93, 28, 149, 0.8) 1px,transparent 0),
            linear-gradient(#5d1c95 1px,transparent 0),
            linear-gradient(90deg,rgba(93, 28, 149, 0.8) 1px,transparent 0),
            linear-gradient(90deg,#5d1c95 1px,transparent 0),
            linear-gradient(transparent 3px,#120458 0,#120458 94px,transparent 0),
            linear-gradient(90deg,#5d1c95 3px,transparent 0,transparent 94px,#5d1c95 0);
        background-size: 100vw, 100vh, 24px 24px,96px 96px,24px 24px,96px 96px,96px 96px,96px 96px;
    }
`;

const ReponsiveContainer = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1200px;
    /* laptop and table
    @media screen and (max-width: 1200px) {
        max-width: 900px;
    }

    /* phones */
    @media screen and (max-width: 900px) {
        max-width: 800px;
    }
`;

export default function SpaceSuit({ children, unlocked }) {
    const isUnlocked = typeof unlocked !== 'undefined' && unlocked;
    const [isValidToken, setValidToken] = useState(isUnlocked);

    const checkToken = async () => {
        //check if the user has a valid token if we are a locked page
        const response = validateToken();
        return await response;
    };

    useEffect(() => {
        !isUnlocked && checkToken().then(res => {
            setValidToken(true);
        }).catch(err => {
            logout(() => {
                navigate('/login#invalidToken');
            });
        });
    }, [isUnlocked]);

    return (
        <>
            <Helmet title={'N E O N A V'}>
                <meta name="title" content="N E O N A V" />
                <meta name="description" content="NAVIGATE NEOTROPOLIS IN STYLE" />
                <meta name="keywords" content="neonav, neotropolis.com" />
                <meta name="robots" content="noindex, nofollow" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="English" />
                < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
                <link href={withPrefix('css/augmented-ui.min.css')} rel="stylesheet" type="text/css" />
            </Helmet>
            <GlobalStyle theme="neonav" />
            <ReponsiveContainer>
                {isValidToken && children}
            </ReponsiveContainer>
        </>
    )
}
