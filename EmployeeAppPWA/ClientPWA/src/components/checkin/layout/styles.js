import styled from 'styled-components';
import { H1 } from 'Unite/Shared/typography';
import { textColor, globalTransition } from '../../../theme/theme';
import Fonts from '../../shared/fonts';

export const Container = styled.div`
  overflow-x: hidden;
  transition: ${globalTransition};
  padding-top: 9px;
`;

export const Title = styled(H1)`
  font: bold 26px ${Fonts.Lato};
  color: ${textColor};
  height: 32px;
`;
