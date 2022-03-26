import React from 'react';
import ReactPlayer from 'react-player';
import { useWindowDimensions } from '../utils/responsive';

function ModalKitty(props) {
  const { width } = useWindowDimensions();
  const maxWidth = width > 900 ? 900 : width - 10;

  return <ReactPlayer url="https://sites.neonav.net/kitty.mp4"  width={maxWidth} playing={true} controls={true} />         
}
export default ModalKitty;    
