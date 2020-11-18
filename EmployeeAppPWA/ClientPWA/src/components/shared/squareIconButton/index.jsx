import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttonBackgroundColor, globalTransition, drawerRowTextColor, drawerRowTextColorActive } from '../../../theme/theme';
import Fonts from '../fonts';

const Anchor = styled.a`
  /* background-color: ${buttonBackgroundColor}; */
  color: ${drawerRowTextColor};
  font-family: ${Fonts.Lato};
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  transition: ${globalTransition};
  display: flex;
  flex-direction: column;
  ${props => props.styles}
  flex: 1;
  &:hover{
    color: white;
  }

  &.active{
    color: ${drawerRowTextColorActive};
  }
`;

const Icon = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Title = styled.span`
`;

const SquareIconButton = (props) => (
  <Anchor className={props.active ? 'active' : ''} onClick={() => props.onPress} {...props}>
    <Icon className={props.icon} />
    <Title>{props.title}</Title>
  </Anchor>
);

SquareIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  styles: PropTypes.array,
  icon: PropTypes.string,
  active: PropTypes.bool,
};

export default SquareIconButton;