import React, { Component } from "react";
import styled, { css } from "styled-components";
import { H1 } from "Unite/Shared/typography";
import Fonts from "../shared/fonts";
import { textColor, globalTransition } from "../../theme/theme";
import { fetchBookingRefAction } from "../../store/actions/checkinAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import LoadingIndicator from "Unite/Shared/loadingIndicator";

const Container = styled.div`
  position: relative;
  padding-top: 40px;
  overflow-x: hidden;
`;

const Content = styled.div`
  margin-left:15px
  position: relative;
`;

const Title = styled(H1)`
  font-family: ${Fonts.Lato};
  color: ${textColor};
  transition: ${globalTransition};
`;

const LoginMenu = styled(Container)`
  margin-top: 60px;
  font-size: 16px;
  margin-left: 12px;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`;

const Item = styled(Container)`
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal bold 18px Lato;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  width: 270px;
  height: 34px;
  color: white;
  letter-spacing: 0px;
  text-align: left;
  opacity: 1;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`;

const Button = styled.button`
  left: 18px;
  width: 339px;
  height: 44px;
  background: #ffdc00 0% 0% no-repeat padding-box;
  opacity: 1;
  background: #f3cd00;
  min-width: 35vh;
  color: black;
  text-decoration: wavy;
  padding: 0.35em 4.4em;
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

const Input = styled.input`
  left: 18px;
  width: 339px;
  height: 50px;
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #b9b9b9;
  border-radius: 3px;
  opacity: 1;
  min-width: 35vh;
  margin-top: 5px;
  padding-top: 0;
  padding-left: 0;
  line-height: 1em;
  ::placeholder {
    color: red;
    padding: 0.35em 3em;
  }
`;

class checkInFeature extends Component {
  constructor() {
    super();
    this.state = {
      bookingid: "",
    };
  }

  handleChange = (evt) => {
    this.setState({ bookingid: evt.target.value });
  };

  canBeSubmitted() {
    const { bookingid } = this.state;
    return bookingid.length > 0;
  }

  clickhere() {
    let value = this.state.bookingid;
    this.setState({ bookingid: "" });
    this.props.fetchBookingRefAction(value);
  }

  getResult() {
    let value;
    if (this.props.checkin.bookingdetails.error === undefined) {
      return (value = "Not a valid code, retry");
    }
    return value;
  }

  render(props) {
    console.log("checking props**", this.props);
    const { bookingid } = this.state;
    const isEnabled = this.canBeSubmitted();
    const placeValue = this.getResult();
    return (
      <Container>
        <Content>
          <Title> Student check-in</Title>
        </Content>
        <LoginMenu>
          <Item> Enter Customer ID </Item>
          <Input
            value={this.state.bookingid}
            onChange={this.handleChange}
            placeholder={placeValue}
            autoFocus
            type="search"
          />{" "}
          <br />
          <br />
          <Button
            disabled={!isEnabled}
            onClick={() => {
              this.clickhere();
            }}
          >
            Check student in
          </Button>
          <br />
          <br />
          {this.props.checkin.bookingdetails.isLoading === true ? (
            <LoadingIndicator message="Fetching checkin details..." />
          ) : null}
          {this.props.checkin.bookingdetails.hasMore === true ? (
            <Redirect to="/checkin-summary" />
          ) : (
            ""
          )}
        </LoginMenu>
      </Container>
    );
  }
}

const mapState = ({ sharePoint, checkin, bookingid }) => ({
  fetchBookingRefAction,
  sharePoint,
  checkin,
});

const mapDispatch = (dispatch) => ({
  fetchBookingRefAction: (bookingid) => {
    dispatch(fetchBookingRefAction(bookingid));
  },
});

export default withRouter(connect(mapState, mapDispatch)(checkInFeature));
