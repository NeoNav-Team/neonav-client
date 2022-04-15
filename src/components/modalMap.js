import React from 'react';
import styled from 'styled-components';

const SyledDiv = styled.div`
    padding: 0.125vh;
    background: black;
    overflow: auto;
    & img {
        border: 0.5vh solid black;
    }
    &.pitch-mixin {
        --aug-tr: 25px;
        --aug-b-extend1: 50%;
    
        --aug-border-all: 1vh;
        --aug-border-bg: black;
        
        --aug-inlay-all: 4px;
        --aug-inlay-bg: black;
        --aug-inlay-opacity: 0.5;
      }
`;


function ModalMap(props) {

  return (
    <SyledDiv className="pitch-mixin" data-augmented-ui={'tl-2-round-y tr-clip  br-clip bl-2-round-y inlay'}>
        <img src="https://sites.neonav.net/neomap.png" width="100%"/>
    </SyledDiv>
    )       
}
export default ModalMap;    
