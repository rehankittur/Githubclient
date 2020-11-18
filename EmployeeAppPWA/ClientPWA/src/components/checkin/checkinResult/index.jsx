import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ResetCustomerDataAction } from '../../../store/actions/checkin';

import { Icon, Value, HeadLine, Default } from './style';
import { Button, MarginedContainer, Summary } from '../styles';

const CheckinResult = ({ error, resetCustomerDataAction }) => {
  const history = useHistory();

  // ok click handler to reset customer data for new checkin
  const restartCheckin = useCallback(() => {
    resetCustomerDataAction();
    history.push('/checkin-feature');
  }, [history, resetCustomerDataAction]);

  useEffect(() => {
    //create timeout of 3 seconds
    const resetCustomerData = () =>
      setTimeout(() => {
        // reset checkin data
        restartCheckin();
      }, 3000);

    // call timeout
    resetCustomerData();

    // timer cleanup on component unmount
    return () => {
      clearTimeout(resetCustomerData);
    };
  }, [restartCheckin]);

  return (
    <>
      <Summary>Confirmation</Summary>
      <HeadLine>
        <Icon>
          {error ? (
            <MarginedContainer>
              <Default> Failed</Default>
              <Value>This student could not be checked in.</Value>
            </MarginedContainer>
          ) : (
            <MarginedContainer>
              <Default> Thank you</Default>
              <Value>
                This student is now checked in.
                <br />
                Returning to the check in screen now.
              </Value>
            </MarginedContainer>
          )}
        </Icon>
      </HeadLine>
      <MarginedContainer>
        <Button onClick={restartCheckin}> Ok </Button>
      </MarginedContainer>
    </>
  );
};

const mapStateToProps = ({ checkin: { error } }) => ({
  error,
});

const mapDispatchToProps = (dispatch) => ({
  resetCustomerDataAction: () => dispatch(ResetCustomerDataAction()),
});

CheckinResult.propTypes = {
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckinResult);
