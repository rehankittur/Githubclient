import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import Colours from '../colours';

const Line = styled(animated.div)`
  height: 2px;
  background-color: ${Colours.yellow};
`;
function AnimatedLine({ toWidth }) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  },[])

  const animatedProps = useSpring({width: mounted ? toWidth : 0})
  return (
    <Line {...toWidth} style={animatedProps} />
  )
}

AnimatedLine.propTypes = {
  toWidth: PropTypes.number.isRequired,
  color: PropTypes.string,
}

export default AnimatedLine;

