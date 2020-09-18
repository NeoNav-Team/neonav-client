import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';

const StyledPaneDiv = styled.div`
  background: transparent;
  margin: 0 auto;
  filter: drop-shadow(0px 0px 5px ${props => props.colors[1]});
  padding: 1.5vh;
  .pitch-mixin {
    --aug-tr: 25px;
    --aug-b-extend1: 50%;

    --aug-border-all: 2px;
    --aug-border-bg: radial-gradient(${props => props.colors[0]}, ${props => props.colors[1]}) 50% 50% / 100% 100%;
    
    --aug-inlay-all: 8px;
    --aug-inlay-bg: radial-gradient(${props => props.colors[2]}, ${props => props.colors[3]})  50% 50% / 100% 100%;
    --aug-inlay-opacity: 0.5;
  }
  .ant-checkbox + span {
    color: #fff;
  }
  .ant-input, .ant-input-password {
      border-radius: 10px 0 10px 0;
  }
  .ant-btn {
      background: #41C5FF;
      filter: drop-shadow(0 0 8px #41C5FF);
      width: 80%;
      left: 50%;
      transform: translate(-50%, 0);
      height: 60px;
      border-radius: 20px 0 20px 0;
      font-size: 2rem;
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
  font-size: 1.75rem;
  filter: drop-shadow(3px 3px 15px #fff);
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
    colors: ['#ff124f', '#ff00a0', 'transparent', '#120458'],
    aguments: 'tl-2-rect-y tr-rect br-clip bl-clip both'
  }
]

function Pane(props) {
  const { title, children, frameId, padding, back, noSpace } = props;
  const frameTheme = frameId ? frames[frameId] : frames[0];
  const pad = padding ? padding : '4vh';
  return (
    <StyledPaneDiv colors={frameTheme.colors}>
      {back && (
        <BackButton
          colors={frameTheme.colors}
          onClick={()=>{navigate(back, { replace: true })}}
        >
          <div>&rarr;</div>
          </BackButton>
      )}
      <div className="pitch-mixin" data-augmented-ui={frameTheme.aguments}>
          <Content padding={pad}>
          {title ? 
          <PaneTitle>{title}</PaneTitle>
          : 
          <>{typeof noSpace === 'undefined ' && <Spacer />}</>
          }
          {children}
        </Content>
      </div>
    </StyledPaneDiv>
  )
}
export default Pane;