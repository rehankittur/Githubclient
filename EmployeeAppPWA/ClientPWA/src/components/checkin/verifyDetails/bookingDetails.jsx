import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Lightbox from 'react-image-lightbox';

import { HeadLine, Item, Key, Value, ImageLink, DueValue, DueValueText } from './styles';
import 'react-image-lightbox/style.css';

export const BookingDetails = ({ bookingDetails }) => {
  // internal state to show/hide customer's id
  const [showCustomerIdProof, setShowCustomerIdProof] = useState(false);

  // render key for the customer's checkin information
  const renderKey = (label) => <Key>{label}:</Key>;

  const CHECKIN_INFO = [
    {
      label: 'Check-in slot',
      value: () =>
        bookingDetails.checkinDate && bookingDetails.checkinTime ? (
          <Value>
            {bookingDetails.checkinDate.toString().split('-').reverse().join('/')} -{' '}
            {bookingDetails.checkinTime.substring(0, 5)}
          </Value>
        ) : (
          <Value>No slot booked</Value>
        ),
    },
    {
      label: 'Booking ref',
      value: () => <Value>{bookingDetails.contractNumber}</Value>,
    },
    {
      label: 'Customer ID',
      value: () => <Value>{bookingDetails.customerId}</Value>,
    },   
    {
      label: 'Room details',
      value: () => (
        <Value>
          {bookingDetails.buildingName}, Floor {bookingDetails.floor}, Block {bookingDetails.block},
          Flat {bookingDetails.flatName}, Room {bookingDetails.roomNumber}
        </Value>
      ),
    },
    {
      label: 'Name',
      value: () => (
        <Value>
          {bookingDetails.firstName} {bookingDetails.lastName}
        </Value>
      ),
    },
	{
      label: 'Age',
      value: () =>
        bookingDetails.dateOfBirth ? (
          <Value>{Math.floor((new Date() - new Date(bookingDetails.dateOfBirth).getTime()) / 3.15576e+10)}</Value>
        ) : (
          <Value>Unavailable</Value>
        ),
    },
    {
      label: 'DOB',
      value: () =>
        bookingDetails.dateOfBirth ? (
          <Value>{bookingDetails.dateOfBirth.toString().split('-').reverse().join('/')}</Value>
        ) : (
          <Value>Unavailable</Value>
        ),
    },
    {
      label: 'Proof of ID',
      value: () =>
        bookingDetails.photoIdPath ? (
          <>
            <ImageLink type="link" onClick={() => setShowCustomerIdProof(true)}>
              Click to review
            </ImageLink>
            {showCustomerIdProof && (
              <Lightbox
                mainSrc={bookingDetails.photoIdPath}
                onCloseRequest={() => setShowCustomerIdProof(false)}
              />
            )}
          </>
        ) : (
          <Value>ID not uploaded</Value>
        ),
    },
    {
      label: 'Balance due',
      value: () =>
        bookingDetails.accountBalance > 0 ? (
          <DueValue>
            <DueValueText>£{bookingDetails.accountBalance}</DueValueText>
          </DueValue>
        ) : (
          <Value>£00.00</Value>
        ),
    },
  ];

  return (
    <HeadLine>
      <Item>
        {CHECKIN_INFO.map(({ label, value }) => (
          <div key={label}>
            {renderKey(label)}
            {value()}
            <br />
          </div>
        ))}
      </Item>
    </HeadLine>
  );
};

BookingDetails.propTypes = {
  bookingDetails: PropTypes.shape({}).isRequired,
};

export default BookingDetails;
