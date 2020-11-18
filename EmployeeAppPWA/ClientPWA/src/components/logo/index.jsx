import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import LogoSvg from '../shared/logo.js';

const Container = styled(animated.div)`
  width: 200px;
  height: 200px;
  position: absolute;
  transform-origin: 50% 50%;
`;

const Logo = (props) => {
  return (<Container><LogoSvg style={{ position: 'absolute' }} /></Container>);
}

export default Logo;