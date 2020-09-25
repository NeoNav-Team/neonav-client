import React from 'react';
import { withPrefix } from 'gatsby';
import {Helmet} from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        height: 100%;
        color: #0EBCC6;
        background: rgb(113,29,145);
        background: radial-gradient(circle, rgba(35,22,56,1) 0%, rgba(18,18,18,1) 100%);
        min-height: 100vh;
        max-height: 100vh;
        min-width: 100vw;
        font-family: 'Orbitron', sans-serif;
        overflow: hidden;
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
    return (
        <>
            <Helmet title={'N E O N A V'}>
                <meta name="title" content="N E O N A V" />
                <meta name="description" content="NAVIGATE NEOTROPOLIS IN STYLE" />
                <meta name="keywords" content="neonav, neotropolis.com" />
                <meta name="robots" content="noindex, nofollow" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="English" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href={withPrefix('css/augmented-ui.min.css')} rel="stylesheet" type="text/css" />
            </Helmet>
            <GlobalStyle theme="neonav" />
            <Portrait>
                {children}
            </Portrait>
        </>
    )
}
