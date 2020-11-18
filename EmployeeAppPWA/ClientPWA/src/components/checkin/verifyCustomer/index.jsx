import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VerifyAndFetchDetailsAction } from '../../../store/actions/checkin';

import LoadingIndicator from '../../shared/loadingIndicator';
import { Item, Input } from './styles';
import { MarginedContainer, Button } from '../styles';

export const VerifyCustomer = ({ verifyCustomerUniqueId, error, isLoading, failedAttempts }) => {
  // local state to store the customer's unique id for checkin
  const [uniqueIdForCheckin, setUniqueIdForCheckin] = useState('');

  // input change event handler
  const handleChange = ({ target: { value } }) => setUniqueIdForCheckin(value);

  // validation to enable checkin button
  const canBeSubmitted = () => uniqueIdForCheckin.length > 0;

  // checkin click handler
  const fetchCustomerDetailsForCheckin = () => {
    verifyCustomerUniqueId(uniqueIdForCheckin);
    setUniqueIdForCheckin('');
  };

  // placeholder text for input
  const getPlaceholderText = () => {
    if (error) {
      return failedAttempts < 3 ? 'Not a valid code, retry' : 'Try a manual check-in';
    }
    return null;
  };

  return (
    <MarginedContainer>
      <Item> Enter Customer ID </Item>
      <Input
        value={uniqueIdForCheckin}
        onChange={handleChange}
        placeholder={getPlaceholderText()}
        type="search"
        required
        autoFocus
      />
      <Button disabled={!canBeSubmitted()} onClick={fetchCustomerDetailsForCheckin}>
        Check student in
      </Button>
      {isLoading ? <LoadingIndicator message="Fetching checkin details..." /> : null}
    </MarginedContainer>
  );
};

const mapStateToProps = ({ checkin: { error, isLoading, failedAttempts } }) => ({
  error,
  isLoading,
  failedAttempts,
});

const mapDispatchToProps = (dispatch) => ({
  verifyCustomerUniqueId: (uniqueIdForCheckin) =>
    dispatch(VerifyAndFetchDetailsAction(uniqueIdForCheckin)),
});

VerifyCustomer.propTypes = {
  verifyCustomerUniqueId: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  failedAttempts: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCustomer);
