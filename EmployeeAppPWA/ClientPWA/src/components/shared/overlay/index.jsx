
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BackDrop = styled.div`
  background-color: rgba(51,51,51,0.8);
  position: fixed;
  z-index: 3;
  top: ${props => props.top ? `${props.top}px` : 0};
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => props.show ? 1 : 0};
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 225 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const Overlay = props => props.show && 
    <BackDrop show={props.show} onClick={props.onClose} top={props.top}>
      {props.children}
    </BackDrop>


Overlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  top: PropTypes.number,
}

export default Overlay
