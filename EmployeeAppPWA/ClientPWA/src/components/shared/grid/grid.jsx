import React from 'react';
import styled from 'styled-components';
import ScreenSize from 'Unite/Utils/mediaqueries';

const GridContainer = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: repeat(1, 1fr);
  grid-template-columns: repeat(1, 1fr);
  -ms-grid-rows: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  ${ScreenSize.mediumUp}{
    grid-column-gap: 25px;
    -ms-grid-columns: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    -ms-grid-rows: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  ${ScreenSize.largeUp}{
    grid-column-gap: 30px;
    -ms-grid-columns: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    -ms-grid-rows: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

const Grid = (props) => {
  const { children } = props;
  return (
    <GridContainer>
      {children}
    </GridContainer>
  )
}

export default Grid;