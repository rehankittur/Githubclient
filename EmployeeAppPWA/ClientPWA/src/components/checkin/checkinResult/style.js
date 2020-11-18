import styled from 'styled-components';
import Colours from '../../shared/colours';

export const HeadLine = styled.div`
  background-color: ${Colours.greyLight};
  color: ${Colours.white};
  font: normal normal 300 14px Open Sans;
  height: 284px;
  margin-bottom: 30px;
`;

export const Icon = styled.div`
  letter-spacing: 0px;
  text-align: left;
  font: normal normal 600 18px Open Sans;
  color: ${Colours.white};
`;

export const Value = styled.div`
  letter-spacing: 0px;
  font: normal normal 300 18px Open Sans;
  opacity: 0.46;
`;

export const Default = styled.div`
  padding-top: 13px;
`;
