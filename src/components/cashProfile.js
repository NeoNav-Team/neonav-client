import React  from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { colors } from '../constants/defaults';
import { Typography } from 'antd';
const { Text } = Typography;

const { primaryCyan } = colors;

const StyledInputDiv = styled.div`
    display: block;
    position: relative;
    left: 0;
    max-height: 64px;
    width: 100%;
    padding-top: 10px;
    text-align: center;
    overflow: hidden;
    @media screen and (max-width: 900px) {
        min-height: 64px;
    }
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, #000, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryCyan}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryCyan};
    }
    &div {
      top: 20px;
    }
`;

const BalanceText = styled(Text)`
    width: calc(90% - 64px);
    font-size: 2.5em;
    display: inline-block;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
    line-height: 2em;
    height: 64px;
    filter: drop-shadow(0 0 3px ${primaryCyan});
`;

const BalanceLabel = styled(Text)`
    width: 50px;
    display: inline-block;
    margin: 0 8px 10px;
    font-size: 16px;
    vertical-align: bottom; 
`;



function CashProfile(props) {
    const { balance, userId } = props;

    const displayOverfill = balance =>{
        return balance > 1000000000 ? 99999999 : balance;
    }

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip tr-rect-x br-clip bl-clip inlay">
                <BalanceText>{displayOverfill(balance)}</BalanceText>
                <BalanceLabel>c±sн</BalanceLabel>
            </StyledInputDiv>
        </div>
    )
}

export default CashProfile;