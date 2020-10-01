import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttonBackgroundColor, buttonBackgroundColorHover, buttonTextColor, globalTransition } from '../../../theme/theme';
import Fonts from '../fonts';

const Anchor = styled.button`
  background-color: ${buttonBackgroundColor};
  transition: ${globalTransition};
  border: 0;
  color: ${buttonTextColor};
  font-family: ${Fonts.Lato};
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  ${props => props.styles}

  &:hover{
    color: white;
    background-color: ${buttonBackgroundColorHover};
  }

  &:active {

  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
    &:hover{
      color: ${buttonTextColor};
      background-color: ${buttonBackgroundColor};
    }
  }
`;

const Button = (props) => {
  return (
    <Anchor onClick={() => props.onPress} {...props}>{props.title}</Anchor>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  styles: PropTypes.array,
};

export default Button;