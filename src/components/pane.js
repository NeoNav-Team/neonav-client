import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { useMediaQuery } from 'react-responsive';
import { useWindowDimensions } from '../utils/responsive';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const StyledPaneDiv = styled.div`
  background: transparent;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  position: relative;
  z-index: 100;
  filter: drop-shadow(0px 0px 6px ${props => props.colors[0]});
  .pitch-mixin-pane {
    ${props => props.offset && `height: calc(${props.height}px - ${props.offset}px);`}
    --aug-tr: 25px;
    --aug-b-extend1: 50%;
    --aug-border-all: 1px;
    --aug-border-bg: radial-gradient(${props => props.colors[0]}, ${props => props.colors[1]}) 100% 100% / 100% 100%;
    --aug-inlay-all: 4px;
    --aug-inlay-bg: radial-gradient(ellipse at top, ${props => props.colors[1]}, transparent)  50% 50% / 100% 100%;
    --aug-inlay-opacity: ${props => props.opacity ? props.opacity : 0.5};
  }
  .ant-checkbox + span {
    color: #fff;
  }
  .ant-input, .ant-input-password {
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
  padding: 10px 16px;
  filter: none;
  min-height: calc(${props => props.height}px - ${props => props.offset}px);
`;


const PaneTitle = styled.div`
  height: 40px;
  margin: 0 6px 8px;
  padding-top: 8px;
  filter: drop-shadow(0px 0px 15px #fff);
  border-bottom: 1px solid #fe75fe;
  h2 {
    color: #fff;
    text-indent: 30px;
    font-size: 30px;
    line-height: 32px;
  }

    /* phones */
    @media screen and (max-width: 1024px) {
      h2 {
        text-indent: 20px;
        font-size: 20px;
        line-height: 32px;
      }
    }
  }
`;

const PaneFooter = styled.div`
  display:block;  
  height: ${props => props.height ? props.height : 60}px;
  min-width: calc(100% - 80px);
  margin: 0 40px;
  & div {
    margin-left: auto;
  }
`;

const BackButton = styled.div`
  position: absolute;
  right: 1.75vh;
  border: 1px solid ${props => props.colors[1]};
  height: 2vh;
  min-height: 20px;
  width: 2vh;
  min-width: 20px;
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
  const { title, children, frameId, back, footer, offset } = props;
  const frameTheme = frameId ? frames[frameId] : frames[0];
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const { height } = useWindowDimensions();
  const headerOffset = isTabletOrMobile ? 64 : 96;
  const subMargins = 70;
  const submenuOffSet = headerOffset + subMargins + (footer ? offset : 0);

  return (
    <StyledPaneDiv
      colors={frameTheme.colors}
      opacity={frameTheme.opacity}
      height={height}
      offset={offset && headerOffset}
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
        className="pitch-mixin-pane"
        data-augmented-ui={frameTheme.aguments}
      >
        <PaneTitle><h2>{title}</h2></PaneTitle>
        <Content offset={offset && submenuOffSet} height={height}>
          <SimpleBar>
            {children}
          </SimpleBar>
        </Content>
        {footer && <PaneFooter height={offset}>{footer}</PaneFooter>}
      </div>
    </StyledPaneDiv>
  )
}
export default Pane;