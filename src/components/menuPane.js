import React from 'react';
import styled from 'styled-components';

const StyledPaneDiv = styled.div`
  background: transparent;
  margin: 0 auto;
  filter: drop-shadow(0px 0px 5px ${props => props.colors[1]});
  padding: 1.5vh;
  .pitch-mixin {
    --aug-tr: 25px;
    --aug-b-extend1: 50%;

    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(${props => props.colors[0]}, ${props => props.colors[1]}) 50% 50% / 100% 100%;
    
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(${props => props.colors[2]}, ${props => props.colors[3]})  50% 50% / 100% 100%;
    --aug-inlay-opacity: 0.5;
  }
  color: white;
`;

const IconContainer = styled.div`
    display: block;
    min-height: 16vh;
    padding: 4vh 0 2vh 8vh;
`;
const IconTitle = styled.div`
    position: absolute;
    border-top: 2px solid #7a04eb;
    left: 4vh;
    transform-origin: 0 0;
    transform: rotate(90deg);
    margin: 0 auto;
    height: 4vh;
    min-width: 100%;
    color: #120458;
    cursor:pointer;
    background-color: #41C5FF;
    filter: drop-shadow(0 0 5px #41C5FF);
    background-image: linear-gradient(45deg, #41C5FF 25%, #000000 25%, #000000 50%, #41C5FF 50%, #41C5FF 75%, #000000 75%, #000000 100%);
    background-size: 2vh 2vh;
    & span {
        margin-left: 4vh;
        display: inline-block;
        text-transform: uppercase;
        display:inline-block;
        padding: 2px 4px;
        font-size: 0.6rem;
        border-bottom: 1px solid #41C5FF;
        background-color: #41C5FF;
    }
`;

const frames = [
  {
    colors: ['#7a04eb', '#7a04eb', '#7a04eb', '#120458'],
    aguments: 'tl-2-clip-x tr-clip br-clip bl-2-clip-x both'
  },
  {
    colors: ['#ff124f', '#ff00a0', 'trnasparent', '#120458'],
    aguments: 'tl-2-rect-y tr-rect br-clip bl-clip both'
  }
]

function MenuPane(props) {
  const { title, children, frameId } = props;
  const frameTheme = frameId ? frames[frameId] : frames[0];
  return (
    <StyledPaneDiv colors={frameTheme.colors}>
      <div className="pitch-mixin" data-augmented-ui={frameTheme.aguments}>
          <IconTitle>
            <span>{title}</span>
          </IconTitle>
          <IconContainer>
            {children}
          </IconContainer>
      </div>
    </StyledPaneDiv>
  )
}
export default MenuPane;