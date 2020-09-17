import React from 'react';
import styled from 'styled-components';

const StyledLogoDiv  = styled.div`
    margin: 0 auto;
    cursor: pointer;
    & svg {
        position: relative;
        width: 100%;
        height: 100%;
        fill: #fff;
        filter: drop-shadow(0 0 5px #fff);
        &:hover {
            filter: drop-shadow(0 0 10px #fff);
        }
    }
`;

function Kitty(props) {
    const {width, height} = props;
    return (
        <StyledLogoDiv
            width={width || 0}
            height={height|| 0}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32">
                <path d="M10 4c0 1.117-.883 2-2 2H7c-2.2 0-4 1.8-4 4s1.8 4 4 4h1.156A7.32 7.32 0 0 0 8 15.5V28h2V15.5c0-3.031 2.469-5.5 5.5-5.5c.902 0 1.75.207 2.5.594V8.438A7.456 7.456 0 0 0 15.5 8c-2.867 0-5.363 1.629-6.625 4H7c-1.117 0-2-.883-2-2s.883-2 2-2h1c2.2 0 4-1.8 4-4zm9 2.094V12.5c0 2.55 2.316 4.5 5 4.5s5-1.95 5-4.5V6.094l-1.563 1.093l-1.656 1.157c-.57-.203-1.133-.438-1.781-.438c-.648 0-1.21.235-1.781.438l-1.657-1.156zm5 3.812c.578 0 1.11.14 1.563.375l.53.281l.5-.343l.407-.281V12.5c0 1.316-1.266 2.5-3 2.5s-3-1.184-3-2.5V9.937l.406.282l.5.344l.532-.282A3.393 3.393 0 0 1 24 9.906zM17 15c-2.758 0-5 2.242-5 5v8h2v-8c0-1.652 1.348-3 3-3s3 1.348 3 3v8h2v-8c0-.965-.273-1.86-.75-2.625a5.884 5.884 0 0 1-2.344-2A4.996 4.996 0 0 0 17 15zm9 2.688A6.477 6.477 0 0 1 24 18v10h2z" />
            </svg>
        </StyledLogoDiv>
    )
}
export default Kitty;