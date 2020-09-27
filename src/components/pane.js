import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { useWindowDimensions } from '../utils/responsive';

const StyledPaneDiv = styled.div`
  background: transparent;
  margin: 0 auto;
  padding: 1.5vh;
  overflow: hidden;
  .pitch-mixin {
    filter: drop-shadow(0px 0px 6px ${props => props.colors[0]});
    max-height: ${props => props.height}px;
    --aug-tr: 25px;
    --aug-b-extend1: 50%;

    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(#ffffff, ${props => props.colors[1]}) 100% 100% / 100% 100%;
    
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, ${props => props.colors[1]}, transparent)  50% 50% / 100% 100%;
    --aug-inlay-opacity: ${props => props.opacity ? props.opacity : 0.5};
  }
  .ant-checkbox + span {
    color: #fff;
  }
  .ant-input, .ant-input-password, .ant-select {
      border-radius: 10px 0 10px 0;
      border: 2px solid ${props => props.colors[2]};
      line-height: 4vh;
      background-color: rgba(0, 0, 0, .5);
      filter: drop-shadow(0px 0px 8px ${props => props.colors[2]});
      & .ant-input, & .ant-select-selector {
        background-color: transparent;
        border: 0;
        line-height: 4vh;
      }
  }
  .ant-btn {
      background: #41C5FF;
      filter: drop-shadow(0 0 8px #41C5FF);
      width: 80%;
      left: 50%;
      transform: translate(-50%, 0);
      height: 6vh;
      border-radius: 20px 0 20px 0;
      font-size: 3vh;
  }
`;
const Content = styled.div`
  padding: ${props => props.padding};
`;

const Spacer = styled.div`
  height: 2vh;
`;

const PaneTitle = styled.h2`
  color: #fff;
  font-size: 2.125vh;
  filter: drop-shadow(0px 0px 15px #fff);
  border-bottom: 2px solid #fe75fe;
  bottom-bottom 2vh;
`;

const BackButton = styled.div`
  position: absolute;
  right: 1.75vh;
  border: 2px solid ${props => props.colors[1]};
  height: 2vh;
  width: 2vh;
  cursor: pointer;
  user-select: none;
  & div {
    cursor: pointer;
    margin: 0;
    line-height: 1.5vh;
    font-size: 1.5vh;
    color: ${props => props.colors[1]};
  }
`

const frames = [
  {
    colors: ['#ff00a0', '#fe75fe', '#7a04eb', '#120458'],
    aguments: 'tl-clip tr-clip-x br-clip b-scoop bl-clip both'
  },
  {
    colors: ['#ff124f', '#7a04eb', '#fe75fe', '#120458'],
    aguments: 'tl-clip-x tr-rect br-2-clip-x bl-clip-x both',
    opacity: '0.75'
  }
]

function Pane(props) {
  const { title, children, frameId, padding, back, noSpace, offset } = props;
  const frameTheme = frameId ? frames[frameId] : frames[0];
  const pad = padding ? padding : '4vh';
  const { height } = useWindowDimensions();
  const paneHeight = offset ? (height - offset) : height;

  console.log('pane height', height);

  return (
    <>
    <StyledPaneDiv
      colors={frameTheme.colors}
      opacity={frameTheme.opacity} 
      height={paneHeight} 
    >
      {back && (
        <BackButton
          colors={frameTheme.colors}
          onClick={()=>{navigate(back, { replace: true })}}
        >
          <div>&rarr;</div>
          </BackButton>
      )}
      <div
        className="pitch-mixin"
        data-augmented-ui={frameTheme.aguments}
      >
          <Content padding={pad}>
          {title ? 
          <PaneTitle>{title}</PaneTitle>
          : 
          <>{typeof noSpace === 'undefined' && <Spacer />}</>
          }
          {children}
        </Content>
      </div>
    </StyledPaneDiv>
    </>
  )
}
export default Pane;