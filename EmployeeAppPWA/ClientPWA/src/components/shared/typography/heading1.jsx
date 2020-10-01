import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import Fonts from '../fonts';
import AnimatedLine from '../animatedLine';

import {
  textColor,
  globalTransition
} from '../../../theme/theme';

const Heading = styled.h1`
  color: ${textColor};
  font-family: ${Fonts.Lato};
  font-size: 26px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 40px;
  transition: ${globalTransition};
`;
const Inner = styled.div`
  display: inline-block;
  padding-bottom: 5px;
`;
export default function H1(props) {
  const { children } = props;
  const [ elemWidth, setElemWidth ] = useState(0);

  const headingRef = useRef(null);

  useEffect(()=> {
    headingRef.current && setElemWidth(headingRef.current.clientWidth);
  }, [headingRef.current])

  return (
    <Heading>
      <Inner ref={headingRef}>
        {children}
      </Inner>
      <AnimatedLine toWidth={elemWidth} />
    </Heading>
  )
}
