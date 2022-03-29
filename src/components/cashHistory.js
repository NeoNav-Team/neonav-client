import React  from 'react';
import styled from 'styled-components';
import { colors } from '../constants/defaults';
import { List, Typography } from 'antd';
const { Text } = Typography;

const { primaryCyan } = colors;

const StyledWrapperDiv  = styled.div`
    display: block;
    color: white;
    min-height: ${props => props.height}px;
    max-height: ${props => props.height}px;
    width: 100%;
    text-align: left;
    overflow: auto;
    &.pitch-mixin {
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
      }
`;


const User = styled(Text)`
  color: #41c5ff;
  font-weight: 300;
  margin-left: 10px;
  font-size: 12px
`;


const StyledHistoryLabel = styled.div`
  font-size: 10px;
  padding: 2px;
  width: 70vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
  }
`;

const StyledHistoryText = styled.div`
  font-size: 12px;
  padding: 10px;
  min-width: 70vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #41c5ff, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#41c5ff, #41c5ff) 100% 100% / 100% 100%;
  }
`;

const StyledHistoryMessage = styled.div`
  padding: 3vw;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
  }
`;

const Timestamp = styled(Text)`
  color: white;
  font-weight: 100;
  margin-left: 10px;
  font-size: 10px
  opacity: 0.55;
`;


function CashHistory(props) {
    const { history, height } = props;

    console.log('history', history);

    const displayOverfill = balance =>{
        return balance > 1000000000 ? 99999999 : balance;
    }

    return (
        <StyledWrapperDiv height={height} className="pitch-mixin" data-augmented-ui="tl-clip tr-rect-x br-clip bl-clip inlay">
            <List
            dataSource={history}
            renderItem={item => (
                <StyledHistoryMessage>
                    <StyledHistoryLabel className="pitch-mixin" data-augmented-ui="tr-clip both">
                        <User>{item.from || item.fromid}</User>
                        <Timestamp>{item.ts}</Timestamp>
                    </StyledHistoryLabel>
                    <StyledHistoryText className="pitch-mixin" data-augmented-ui="tr-clip br-round bl-round both">
                        <Text>{item.username || item.user} 💸 {item.amount}</Text>
                    </StyledHistoryText>
                </StyledHistoryMessage>
            )}
        />
        </StyledWrapperDiv>
    )
}

export default CashHistory;