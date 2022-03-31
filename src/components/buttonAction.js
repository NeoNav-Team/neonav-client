import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { colors } from '../constants/defaults';

const {primaryCyan, primaryIndigo, primaryColor } = colors;

const IconWrap = styled.div`
    position: relative;
    display: inline-block;
    margin: 0 0.5rem;
    min-width: 4rem;
    min-height: 4rem;
    font-size: 2rem;
    color: white;
    opacity: 1;
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryCyan}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryIndigo}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryCyan};
    }
`;

const IconButton = styled.button`
    color: white;
    background-color: transparent;
    background-repeat:no-repeat;
    border: none;
    cursor: pointer;
    outline: none;
    min-width: 4rem;
    min-height: 4rem;
    position: absolute;
    left: 0;
    top: 0;
}`;

function ButtonAction(props) {
    const { icon, title, isEven, clickHandler } = props;
   

  return (
      <div style={{display:'block', border: '1px solid red', cursor: 'pointer'}}>something</div>
        // <IconWrap className={`pitch-mixin ${isEven && 'even'}`} data-augmented-ui="border all-hex" >
        //     <button
        //         onClick={clickHandler ? clickHandler : void}
        //     >
        //         {icon}{title && ` ${title}`}
        //     </button>
        // </IconWrap>
  )
}
export default ButtonAction;