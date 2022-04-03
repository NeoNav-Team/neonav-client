import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { colors } from '../constants/defaults';
import {
    Row,
    Col
} from 'antd';
import AddChannel from './icons/addChannel';
import Chat from './icons/chat';


const {primaryCyan, primaryIndigo, primaryMagenta, primaryColor } = colors;

const StyledInputDiv = styled.div`
    display: block;
    position: relative;
    left: 0;
    top: -10px;
    height: 64px;
    width: 98%;
    margin : 0px;
    padding: 0 4px;
    text-align:center;
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 3px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryMagenta}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 3px;
        --aug-border-bg: radial-gradient(${primaryIndigo}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryCyan};
    }
`;


const IconName = styled.div`
    display:block;
    position: absolute;
    z-index: 10;
    text-align: left;
    font-size: 1rem;
    padding: 0 12px;
    max-width: 75vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${primaryColor};
    &.pitch-mixin2 {
        --aug-inlay: initial;
        --aug-inlay-all: 3px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryIndigo},  rgba(122, 4, 235, .75))  50% 50% / 100% 100%;
        --aug-border-all: 3px;
        --aug-border-bg: radial-gradient(${primaryIndigo}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryColor};
    }
    span {
        color: ${primaryColor};
        padding: 0;
        margin: 0;
        filter: drop-shadow(0 0 5px ${primaryColor});
        white-space: nowrap;
    }
`;

const IconWrap = styled.div`
    position: relative;
    display: inline-block;
    margin: 0 0.5rem;
    min-width: 4rem;
    min-height: 4rem;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    opacity: 1;
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryCyan}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryIndigo}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryCyan};
    }
    & svg {
        color: white;
        font-size: 2rem;
        margin-top: 0.5rem;
    }
`;

const IconTitleWrap = styled.div`
    position: relative;
    display: inline-block;
    margin: 0 0.5rem;
    min-width: 4rem;
    min-height: 4rem;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    opacity: 1;
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryMagenta}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryIndigo}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryCyan};
    }
    & svg {
        color: ${primaryMagenta};
        font-size: 3rem;
        margin-top: 0.5rem;
        filter: drop-shadow(0 0 5px ${primaryMagenta});
    }
`;

function ChannelActions(props) {
    const handleCreate = () => {
        navigate(`/?p=channels#createChannel`);
    }

    return (
        <div>
            <IconName className="pitch-mixin2" data-augmented-ui="tl-clip br-clip inlay">
                <span>Channel Actions</span>
            </IconName>
            <div data-augmented-ui-reset>
                <StyledInputDiv className="pitch-mixin" data-augmented-ui="tr-round br-round bl-clip tl-round inlay">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <IconTitleWrap className="pitch-mixin" >
                                <div style={{width: '48px', margin: '4px 8px'}}>
                                <Chat fill={primaryMagenta} />
                                </div>
                            </IconTitleWrap>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <IconWrap 
                                className="pitch-mixin"
                                data-augmented-ui="border all-hex"
                                onClick={handleCreate}
                            >
                                <div style={{width: '48px', margin: '4px 8px'}}><AddChannel/></div>
                            </IconWrap>
                        </Col>
                        <Col className="gutter-row" span={6}>
                        </Col>
                        <Col className="gutter-row" span={6}>
                        </Col>
                    </Row>
                </StyledInputDiv>
            </div>
        </div>
    )
}

export default ChannelActions;