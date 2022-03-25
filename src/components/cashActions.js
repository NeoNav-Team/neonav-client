import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { navigate } from 'gatsby';
import { colors } from '../constants/defaults';
import { QrcodeOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
const { Text } = Typography;

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
    const { balance, userId } = props;

    const displayOverfill = balance =>{
        return balance > 1000000000 ? 99999999 : balance;
    }

    const openPayModal = () => {
        console.log('openPayModal');
        navigate(`/?p=cash#payCash`);
    }

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-rect tr-clip br-round bl-scoop both">
               <CashButton icon={<QrcodeOutlined />}>Scan</CashButton> 
               <CashButton>Request</CashButton> 
               <CashButton onClick={openPayModal}>Pay</CashButton>
            </StyledInputDiv>
        </div>
    )
}

export default CashActions;