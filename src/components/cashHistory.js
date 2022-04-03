import React  from 'react';
import styled from 'styled-components';
import { colors } from '../constants/defaults';
import { List, Typography, Row, Col } from 'antd';
import moment from 'moment';
import { navigate } from 'gatsby';
import _ from 'lodash';

const { Text } = Typography;

const { primaryCyan, primaryIndigo, primaryMagenta } = colors;

const StyledWrapperDiv  = styled.div`
    display: block;
    color: white;
    height: ${props => props.height}px;
    margin: 0;
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
  line-height: 1vh;
`;

const Id = styled.div`
  font-size: 1.25vh;
  color: white;
  font-weight: 200;
  position: absolute;
  margin-top: -5vh;
  opacity: 0.5;
`;

const Name = styled.span`
  font-size: 2vh;
  line-height: 1vh;
  nargin: 0;
  padding: 0;
  color: #fff;
`;

const Amount = styled.span`
  font-size: 3vh;
  filter: drop-shadow(0 0 5px #000);
`;

const StyledHistoryLabel = styled.div`
  font-size: 1.5vh;
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
  padding: 1vh;
  min-width: 70vw;
  max-height: 10vh;
  &.pitch-mixin {
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, #41c5ff, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#41c5ff, #41c5ff) 100% 100% / 100% 100%;
  }
`;

const StyledHistoryMessage = styled.div`
  padding: 0;
  margin: 2vh 1vh;
  font-size: 3vh;
  &.pitch-mixin {
    --aug-inlay-all: 1px;
    --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryCyan}, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(${primaryIndigo}, #7a04eb) 100% 100% / 100% 100%;
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

    const getID = id => {
      if (typeof id !== 'undefined') {
        navigate(`/?p=identification&id=${id}`);
      }
    }

    const timestamp = timestamp => {
      const formatedTimeStamp = moment(timestamp).format("ddd HH:mm:ss");
      return formatedTimeStamp;
    }

    return (
        <StyledWrapperDiv height={height} className="pitch-mixin" data-augmented-ui="tl-clip tr-rect-x br-clip bl-clip inlay">
            <List
            dataSource={history}
            renderItem={item => (
                <StyledHistoryMessage>
                    <StyledHistoryLabel className="pitch-mixin" data-augmented-ui="tr-clip both">
                        <User>{item.from || item.fromid}</User>
                        <Timestamp>{timestamp(item.ts)}</Timestamp>
                    </StyledHistoryLabel>
                    <StyledHistoryText className="pitch-mixin" data-augmented-ui="tr-clip br-round bl-round inlay">
                    <Row align="bottom">
                      <Col span={11}><div onClick={_.partial(getID, item.user)}>
                        <Name>{item.username || item.user}</Name>
                        <Id>{<span>{item.user}</span>}</Id>
                        
                      </div></Col>
                      <Col span={2}>💸</Col>
                      <Col span={11} style={{textAlign: 'right', textIndent: '2.5vh'}}>
                        <Amount>{item.amount}</Amount>
                      </Col>
                    </Row>
                    </StyledHistoryText>
                </StyledHistoryMessage>
            )}
        />
        </StyledWrapperDiv>
    )
}

export default CashHistory;