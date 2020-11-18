import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ConfirmCheckinAction } from '../../../store/actions/checkin';

import LoadingIndicator from '../../shared/loadingIndicator';
import { BookingDetails } from './bookingDetails';

import { Button, MarginedContainer, Summary } from '../styles';
import { Default } from './styles';
import 'react-image-lightbox/style.css';

export const VerifyCheckinSummary = ({ bookingDetails, confirmBookingAction, isLoading }) => {
  // handle confirm checkin button click
  const confirmCheckinClickHandler = () => {
    const { id, bookingType, instanceId, occupierId } = bookingDetails;
    confirmBookingAction(id, bookingType, instanceId, occupierId);
  };

  return (
    <>
      <Summary>Confirmation</Summary>
      <BookingDetails bookingDetails={bookingDetails} />

      <MarginedContainer>
        {isLoading && <LoadingIndicator message="Confirming check-in..." />}
        <Button disabled={isLoading} onClick={confirmCheckinClickHandler}>
          Confirm check-in
        </Button>
        <Default>
          By clicking ‘Confirm check-in’ you are confirming you have seen the students ID and proof
          of age if they have a kitchen pack.
        </Default>
      </MarginedContainer>
    </>
  );
};

const mapStateToProps = ({ checkin: { bookingDetails, isLoading } }) => ({
  bookingDetails,
  isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  confirmBookingAction: (id, bookingType, instanceId, occupierId) => {
    dispatch(ConfirmCheckinAction(id, bookingType, instanceId, occupierId));
  },
});

VerifyCheckinSummary.propTypes = {
  confirmBookingAction: PropTypes.func.isRequired,
  bookingDetails: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCheckinSummary);
