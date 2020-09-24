import React from 'react';
import styled from 'styled-components';

const AvatarDiv = styled.div`
    background-color: #000;
    width: calc(100% - 2vh);
    min-height: calc(100% - 2vh);
    margin: 1vh;
    filter: drop-shadow(0px 0px 12px #fe75fe);
    clip-path: polygon(0% 15%, 15% 0%, 85% 0%, 85% 7%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 15% 93%, 0% 85%);
    img {
        width: 100%;
    }
`;

function UserAvatar(props) {
    const { alt, data } = props;

    return (
        <AvatarDiv>
            {data && <img src={data}  alt={alt} />}
        </AvatarDiv>
    )
}
export default UserAvatar;    