import React from 'react'
import styled from 'styled-components';
import Colours from '../shared/colours';
const Circle = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${Colours.yellow};
  border-radius: 50%;
`;
export default function Bullet(props) {
  return (
    <Circle {...props}/>
  )
}
