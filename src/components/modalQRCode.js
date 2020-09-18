import React from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';

const SyledDiv = styled.div`
    padding: 2vh;
    background: white;
    & svg {
        width: 100%;
        border: 4vh solid white;
    }
    &.pitch-mixin {
        --aug-tr: 25px;
        --aug-b-extend1: 50%;
    
        --aug-border-all: 1vh;
        --aug-border-bg: #ccc;
        
        --aug-inlay-all: 8px;
        --aug-inlay-bg: white;
        --aug-inlay-opacity: 0.5;
      }
`;

function ModalQRCode(props) {
    const {value} = props;
    return (
        <SyledDiv className="pitch-mixin" data-augmented-ui={'tl-2-round-y tr-clip r-scoop-y br-clip bl-2-round-y l-rect both'}>
            <QRCode size="420" renderAs="svg" value={value} />
        </SyledDiv>
    )
}
export default ModalQRCode;    
