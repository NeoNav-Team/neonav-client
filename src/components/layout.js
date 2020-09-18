import React from 'react';
import { withPrefix } from 'gatsby';
import {Helmet} from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        height: 100%;
        overflow: hidden;
        color: #0EBCC6;
        background: rgb(113,29,145);
        background: radial-gradient(circle, rgba(35,22,56,1) 0%, rgba(18,18,18,1) 100%);
        min-height: 100vh;
        max-height: 100vh;
        min-width: 100vw;
        font-family: 'Orbitron', sans-serif;
    }
    .center {
        text-align: center;
    }
`;

const Portrait = styled.div`
    position: relative;
    max-width: 75vh;
    min-height: 100vh;
    overflow: hidden;
    margin: 0 auto;
`;

export default function Layout({ children }) {
    return (
        <>
            <Helmet title={'N E O N A V'}>
                <link href={withPrefix('css/augmented-ui.min.css')} rel="stylesheet" type="text/css" />
            </Helmet>
            <GlobalStyle theme="neonav" />
            <Portrait>
                {children}
            </Portrait>
        </>
    )
}
