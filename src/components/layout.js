import React from 'react';
import { withPrefix } from 'gatsby';
import {Helmet} from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import { isLoggedIn } from '../services/auth';
import Logo from './logo';
import FormLogin from './formLogin';
import FooterNav from './footerNav';
import PageSpinner from './pageSpinner';

const GlobalStyle = createGlobalStyle`
    html, body {
        color: #0EBCC6;
        background: rgb(113,29,145);
        background: radial-gradient(circle, rgba(35,22,56,1) 0%, rgba(18,18,18,1) 100%);
        min-height: 100vh;
        min-width: 100vw;
        font-family: 'Orbitron', sans-serif;
    }
    h1 {
        font-size: 2em;
        line-height: 2.25em;
    }
    h3 {
        font-size: 1em;
        line-height: 2em;
    }
    p {
        font-size: 0.5em;
    }
    .center {
        text-align: center;
    }
`;

const Portrait = styled.div`
    position: relative;
    max-width: 75vh;
    min-height: 100vh;
    margin: 0 auto;
`;


export default function Layout({ children }) {
    const loggedIn = isLoggedIn();
    return (
        <>
            <Helmet title={'N E O N A V'}>
                <link href={withPrefix('css/augmented-ui.min.css')} rel="stylesheet" type="text/css" />
            </Helmet>
            <GlobalStyle theme="neonav" />
                <Portrait>
                    {loggedIn === 'true' &&
                        <>
                            {children}
                        </>
                    }
                    {loggedIn === 'false' &&
                        <>
                            <Logo />
                            <FormLogin />
                        </>
                    }
                    {loggedIn === 'true' && <FooterNav />}
                    {typeof loggedIn === 'undefined' &&
                        <>
                            <PageSpinner />
                        </>
                    }
                </Portrait>
        </>
    )
}
