import React from 'react'
import styled from 'styled-components';
import Fonts from '../fonts';
import {
  textColor,
  globalTransition
} from '../../../theme/theme';

const Heading = styled.h2`
  color: ${textColor};
  font-family: ${Fonts.Lato};
  font-size: 19px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 3px;
  transition: ${globalTransition};
`;
export default function H2(props) {
  const { children, style } = props;
  return (
    <Heading style={style}>
      {children}
    </Heading>
  )
}
