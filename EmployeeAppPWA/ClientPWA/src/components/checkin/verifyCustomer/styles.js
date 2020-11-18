import styled from 'styled-components';
import Colours from '../../shared/colours';
import ScreenSize from 'Unite/Utils/mediaqueries';

export const Item = styled.div`
  padding-top: 40px;
  text-align: left;
  font: bold 20px Lato;
  color: ${Colours.white};
  height: 34px;
  text-align: left;
`;

export const Input = styled.input`
  width: 339px;
  height: 50px;
  background: ${Colours.white};
  -webkit-appearance: none;
  border-radius: 3px;
  border: 1px solid #b9b9b9;
  margin-top: 5px;
  font: normal 300 26px Open Sans;
  color: ${Colours.black};
  text-align: center;
  min-width: -webkit-fill-available;
  ${ScreenSize.medium}{
    min-width: initial;
  }
  ${ScreenSize.largeUp}{
      min-width: initial;
  }
  ::placeholder {
    color: ${Colours.redError};
  }
  display: block;
`;
