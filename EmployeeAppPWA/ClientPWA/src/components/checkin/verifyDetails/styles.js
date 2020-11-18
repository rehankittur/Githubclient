import styled from 'styled-components';
import Colours from '../../shared/colours';

export const HeadLine = styled.div`
  background-color: ${Colours.greyLight};
  color: ${Colours.white};
  padding: 20px 30px 40px 30px;
  margin-bottom: 15px;
`;

export const Item = styled.div`
  margin-left: -15px;
  text-align: left;
  letter-spacing: 0px;
  opacity: 1;
`;

export const Key = styled.div`
  font: normal normal 600 14px Open Sans;
`;

export const ImageLink = styled.div`
  font: normal normal 600 14px Open Sans;
  margin-top: -20px;
  margin-left: 129px;
  cursor: pointer;
  color: ${Colours.yellow};
`;

export const Value = styled.div`
  font: normal normal lighter 14px Open Sans;
  opacity: 0.46;
  margin-top: -20px;
  margin-left: 130px;
`;

export const DueValue = styled.div`
  width:20%
  font: normal normal 300 14px Open Sans;
  margin-top: -20px;
  margin-left: 128px;
  border: 3px solid ${Colours.yellow};
  padding: 3px 10px 3px 8px;
  border-radius: 3px;
`;

export const DueValueText = styled.div`
  opacity: 0.46;
`;

export const Default = styled.div`
  opacity: 0.46;
  margin-top: -20px;
  text-align: left;
  font: normal normal 300 14px Open Sans;
  color: ${Colours.white};
`;
