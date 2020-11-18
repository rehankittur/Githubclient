import styled, { css } from 'styled-components';
import Colours from '../shared/colours';
import ScreenSize from 'Unite/Utils/mediaqueries';

export const MarginedContainer = styled.div`
  padding: 0px 15px;
`;

export const Button = styled.button`
  width: 339px;
  height: 44px;
  color: ${Colours.black};
  text-decoration: wavy;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  min-width: -webkit-fill-available;
  ${ScreenSize.medium}{
    min-width: initial;
  }
  ${ScreenSize.largeUp}{
      min-width: initial;
  }
  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
          background: ${Colours.yellowDisabled};
        `
      : css`
          background: ${Colours.yellow};
          cursor: pointer;
        `};
  margin: 28px 0px;
  display: block;
`;

export const Summary = styled.div`
  height: 24px;  
  color: ${Colours.white};  
  padding-bottom: 10px;
  padding-left: 15px;
  text-align: left;
  font: normal normal bold 20px Lato;
  letter-spacing: 0px;
  opacity: 1;
`;

export const Default = styled.div`
  padding-top: 13px;
  text-align: left;
  font: normal normal 300 14px Open Sans;
  color: ${Colours.white};
`;
