import React from 'react';
import { createGlobalStyle } from 'styled-components';

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
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
`;


export default function Layout({ children }) {
  return (
    <>
        <GlobalStyle theme="neonav" />
            {children}
    </>
  )
}
