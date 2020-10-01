import React, { Component } from "react";
import { connect } from "react-redux";
import Fonts from "../shared/fonts";
import styled, { css } from "styled-components";
import { H1 } from "Unite/Shared/typography";
import { textColor, globalTransition } from "../../theme/theme";
import Colours from "Unite/Shared/colours";
import { withRouter } from "react-router";
import { confirmBookingRefAction } from "../../store/actions/checkinAction";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import LoadingIndicator from "Unite/Shared/loadingIndicator";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  position: relative;
  overflow-x: hidden;
  opacity: 1;
`;

const Content = styled.div`
  margin-left: 15px;
  position: relative;
`;

const Title = styled(H1)`
  font-family: ${Fonts.Lato};
  color: ${textColor};
  transition: ${globalTransition};
`;

const LoginMenu = styled(Container)`
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  left: 0px;
  opacity: 1;
`;

const HeadLine = styled.div`
  background-color: ${Colours.greyMedium};
  color: white;
  padding: 40px 30px 40px 30px;
  margin-bottom: 30px;
  -webkit-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`;

const Summary = styled.div`
  top: 140px;
  left: 18px;
  height: 24px;
  color: #ffffff;
  font-size: 18px;
  padding-bottom: 10px;
  text-align: left;
  font: normal normal bold 20px/24px Lato;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-left: 15px;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`;

const Item = styled.div`
  opacity: 1;
  text-align: left;
`;

const Key = styled.div`
  font: normal normal 600 14px Open Sans;
  letter-spacing: 0px;
`;

const ImageLink = styled.div`
  cursor: pointer;
  color: yellow;
  opacity: 0.6;
`;

const Value = styled.div`
  font: normal normal 300 14px Open Sans;
  letter-spacing: 0px;
  opacity: 0.46;
  margin-top: -20px;
  margin-left: 145px;
`;

const Default = styled.div`
  margin: 0px 15px 0px 15px;
  padding-top: 13px;
  -webkit-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal 300 14px Open Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  top: 700px;
  left: 18px;
`;

const Button = styled.button`
  margin-left: 15px;
  height: 44px;
  background: #ffdc00 0% 0% no-repeat padding-box;
  opacity: 1;
  background: #f3cd00;
  color: black;
  text-decoration: wavy;
  padding: 0.35em 6.7em;
  font-weight: bold;
  font-size: 16px;
  ${(props) =>
    props.disabled
      ? css`
          pointer-events: none;
          opacity: 0.4;
        `
      : css`
          cursor: pointer;
        `};
`;

export class CheckInSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  clickMe(id, bookingType, instanceId, occupierId) {
    this.props.confirmBookingRefAction(id, bookingType, instanceId, occupierId);
  }

  render(props) {
    let data = this.props.checkin.bookingdetails.items;
    const { isOpen } = this.state;

    return (
      <Container>
        <Content>
          <Title> Student check-in</Title>
        </Content>
        <LoginMenu>
          <Summary>Confirmation</Summary>
          <HeadLine>
            <Item>
              <Key>Check-in slot:</Key>
              {data.checkinDate && data.checkinTime ? (
                <Value>
                  {data.checkinDate.toString().split("-").reverse().join("/")} -{" "}
                  {data.checkinTime.substring(0, 5)}
                </Value>
              ) : (
                <Value>No slot booked</Value>
              )}
              <br />
              <Key>Customer Id:</Key>
              <Value>{data.customerId}</Value> <br />
              <Key>Booking reference:</Key>
              <Value>{data.contractNumber}</Value> <br />
              <Key>Room number:</Key>
              <Value>
                {data.buildingName}, Floor {data.floor}, Block {data.block},
                Flat {data.flatName}, Room {data.roomNumber}
              </Value>{" "}
              <br />
              <Key>Name:</Key>
              <Value>
                {data.firstName} {data.lastName}
              </Value>{" "}
              <br />
              <Key>DOB:</Key>
              {data.dateOfBirth ? (
                <Value>
                  {data.dateOfBirth.toString().split("-").reverse().join("/")}
                </Value>
              ) : (
                <Value>Not available</Value>
              )}
              <br />
              <Key>Proof of ID:</Key>
              {data.photoIdPath ? (
                <Value>
                  <ImageLink
                    type="link"
                    onClick={() => this.setState({ isOpen: true })}
                  >
                    Click to review
                  </ImageLink>
                  {isOpen && (
                    <Lightbox
                      mainSrc={data.photoIdPath}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                  )}
                </Value>
              ) : (
                <Value>ID not uploaded</Value>
              )}
              <br />
            </Item>
            {this.props.checkin.confirmUser.isLoading === true ? (
              <LoadingIndicator message="Confirming check-in..." />
            ) : null}
          </HeadLine>
          <Button
            onClick={() =>
              this.clickMe(
                data.id,
                data.bookingType,
                data.instanceId,
                data.occupierId
              )
            }
          >
            {" "}
            Confirm check-in{" "}
          </Button>
          <br />
          {this.props.checkin.confirmUser.hasMore === true ||
          this.props.checkin.confirmUser.error ? (
            <Redirect to="/checkin-confirmation" />
          ) : null}
          <Default>
            By clicking ‘Confirm check-in’ you are confirming you have seen the
            students ID and proof of age if they have a kitchen pack.
          </Default>
        </LoginMenu>
      </Container>
    );
  }
}

const mapState = ({ sharePoint, checkin }) => ({
  confirmBookingRefAction,
  sharePoint,
  checkin,
});

const mapDispatch = (dispatch) => ({
  confirmBookingRefAction: (id, bookingType, instanceId, occupierId) => {
    dispatch(confirmBookingRefAction(id, bookingType, instanceId, occupierId));
  },
});

export default withRouter(connect(mapState, mapDispatch)(CheckInSummary));
