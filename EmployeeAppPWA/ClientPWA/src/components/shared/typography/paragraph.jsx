import React from 'react'
import styled from 'styled-components';
import Fonts from '../fonts';
import {
  textColor,
  globalTransition
} from '../../../theme/theme';

const Paragraph = styled.p`
  color: ${textColor};
  font-family: ${Fonts.Lato};
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  margin-top: 0;
  margin-bottom: 10px;
  transition: ${globalTransition};
`;
export default function P(props) {
  const { children } = props;
  return (
    <Paragraph>
      {children}
    </Paragraph>
  )
}
