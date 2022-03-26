import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { colors } from '../constants/defaults';
import { paramsFromLocation } from '../utils/navigation'
import { QrcodeOutlined } from '@ant-design/icons';
import PopoverQRReader from './popoverQRReader';
import { Badge, Button } from 'antd';

const {primaryCyan, primaryIndigo, primaryMagenta } = colors;

const StyledInputDiv = styled.div`
    display: block;
    position: relative;
    left: 0;
    height: 64px;
    width: calc(100% - 34px);
    margin : 16px;
    padding: 10px;
    text-align: center;
    overflow: hidden;
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryMagenta}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryIndigo}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryCyan};
    }
    &div {
      top: 20px;
    }
`;

const CashButton = styled(Button)`
    margin: 0 8px;
    font-size: 1em;
    min-height: 40px;
`

function CashActions(props) {
    const [errCount, setErrCount ] = useState(0);

    const openPayModal = () => {
        navigate(`/?p=cash#payCash`);
    }

    const openRequestModal = () => {
        navigate(`/?p=cash#requestCash`);
    }

    const onScanRecipient = scan => {
        setErrCount(0);
        const params = paramsFromLocation(scan);
        const { p, r, a } = params;
        if (typeof p !== 'undefined' && p === 'cash'){
            navigate(`/?p=cash${typeof r !== 'undefined' && `&r=${r}`}${typeof a !== 'undefined' && `&a=${a}`}#payCash`);
        } else if (scan.length === 10 && !isNaN(scan)) {
            navigate(`/?p=cash${r && `&r=${scan}`}#payCash`);
        } else {
            setErrCount(1);
        }
    }

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-rect tr-clip br-round bl-scoop both">
                <PopoverQRReader successHandler={onScanRecipient}>
                    <Badge count={errCount}>
                        <CashButton icon={<QrcodeOutlined />}>Scan</CashButton>
                    </Badge>
                </PopoverQRReader>
               <CashButton onClick={openRequestModal}>Request</CashButton> 
               <CashButton onClick={openPayModal}>Pay</CashButton>
            </StyledInputDiv>
        </div>
    )
}

export default CashActions;