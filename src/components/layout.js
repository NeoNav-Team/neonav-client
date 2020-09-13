import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
    max-width: 75vh;
    min-height: 100vh;
    margin: 0 auto;
`;


export default function Layout({ children }) {
  return (
    <>
        <GlobalStyle theme="neonav" />
            <Portrait>
                {children}
            </Portrait>
    </>
  )
}
