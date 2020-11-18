
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes} from 'styled-components';
import Fonts from 'Unite/Shared/fonts';
import Colours from 'Unite/Shared/colours';
import {
  textColor,
} from 'Unite/Theme/theme';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Loader = styled.div`
  font-size: 10px;
  /* margin: 50px auto; */
  text-indent: -9999em;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${Colours.yellow};
  background: linear-gradient(to right, ${Colours.yellow} 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: ${rotate} 0.5s infinite linear;
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: ${Colours.yellow};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &:after {
    background: ${Colours.black};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const Message = styled.div`
  color: white;
  margin-left: 10px;
  flex: 1;
  align-self: center;
  color: ${textColor};
  font-family: ${Fonts.Lato};
  font-size: 18px;
  font-weight: normal;
`;

const LoadingIndicator = (props) => {
  return (
    <Container>
      <Loader />  
      {props.message && <Message>{props.message}</Message>}
    </Container>
    
  )
}

LoadingIndicator.propTypes = {
  message: PropTypes.string,
}

export default LoadingIndicator;
