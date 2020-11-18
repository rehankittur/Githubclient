import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckinLayout from './layout';
import VerifyCustomer from './verifyCustomer';
import VerifyCheckinSummary from './verifyDetails';
import CheckinResult from './checkinResult';

const CustomerCheckin = ({ bookingDetails, error, isLoading, isCheckedTriggered }) => (
  <CheckinLayout>
    {!bookingDetails && !isCheckedTriggered && <VerifyCustomer />}
    {!error && bookingDetails && <VerifyCheckinSummary />}
    {!isLoading && isCheckedTriggered && <CheckinResult />}
  </CheckinLayout>
);

const mapStateToProps = ({
  checkin: { bookingDetails, error, isLoading, isCheckedTriggered },
}) => ({
  error,
  isLoading,
  bookingDetails,
  isCheckedTriggered,
});

CustomerCheckin.propTypes = {
  bookingDetails: PropTypes.shape({}),
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(CustomerCheckin);
