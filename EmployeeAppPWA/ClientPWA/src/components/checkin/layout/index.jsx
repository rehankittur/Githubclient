import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title } from './styles';
import { MarginedContainer } from '../styles';

export const CheckinLayout = ({ children }) => (
  <Container>
    <MarginedContainer>
      <Title> Student check-in</Title>
    </MarginedContainer>
    {children}
  </Container>
);

CheckinLayout.propTypes = {
  children: PropTypes.node,
};

export default CheckinLayout;
