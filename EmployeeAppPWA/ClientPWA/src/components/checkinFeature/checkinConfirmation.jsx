import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import Fonts from '../shared/fonts';
import styled, { css } from 'styled-components';
import { H1 } from 'Unite/Shared/typography';
import { textColor, globalTransition } from '../../theme/theme';
import { withRouter } from 'react-router';
import Colours from 'Unite/Shared/colours';
import { deleteBookingRefAction } from '../../store/actions/checkinAction';

const Container = styled.div`
  position: relative;
  padding-top: 40px; 
`;

const Content = styled.div`
  margin-left:15px
  position: relative;
`;

const ContentPosition = styled.div`  
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
  overflow:hidden;
`;

const HeadLine = styled.div`
  background-color: ${Colours.greyMedium};
  color: white;
  font: normal normal 600 14px Open Sans;
  letter-spacing: 0px;
  opacity:1;
  height: 284px;
  margin-bottom: 30px;
  -webkit-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out; 
`;

const Summary = styled.div` 
  height: 24px;
  color: #FFFFFF;
  font-size:18px; 
  padding-bottom: 10px;
  text-align: left;
  font: normal normal bold 20px Lato;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  margin-left:15px;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out; 
`;


const Default = styled.div`
  margin-left:15px;
  padding-top: 13px;
 -webkit-transition: all 0.5s ease-in-out;
 -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal 300 14px Open Sans;
  letter-spacing: 0px;
  color: #FFFFFF;
  height: 57px; 
`;

const Icon = styled.div`
  -webkit-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal 300 14px Open Sans;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;  
`;


const Button = styled.button`
  margin-left: 15px;
  height: 44px;
  opacity: 1;
  background:  #FFDC00; 
  color:black;
  text-decoration: wavy;
  padding: 0.49em 9.7em;
  font-weight: bold;
  font-size:16px;    
`;

const Value = styled.div`
  font: normal normal 300 14px Open Sans;
  letter-spacing: 0px;
  opacity: 0.46;
  margin-top: -30px;
  margin-left: 15px;
`;


export class CheckInSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedList: []

    };
  }

  clickMe() {    
    this.props.deleteBookingRefAction();
  }

  render(props) {    
    return (
      <Container>
        <Content>
          <Title> Student check-in</Title>
        </Content>
        <LoginMenu>
          <Summary>Confirmation</Summary>
          <HeadLine>
            <Icon>
              {this.props.checkin.confirmUser.error
                ? <ContentPosition>
                  <Default> Failed</Default><Value>This student could not be checked in.
                 </Value>
                  </ContentPosition>
                : <ContentPosition>
                  <Default> Thank you</Default><Value>This student is now checked in.<br />
                  Returning to the check in screen now.</Value>
                  </ContentPosition>
              }
            </Icon>
          </HeadLine>
          <Button onClick={() => this.clickMe()} as={Link} to="/checkin-feature" > Ok </Button><br />
        </LoginMenu>
      </Container>
    );
  }
}


const mapState = ({ sharePoint, checkin }) => ({
  deleteBookingRefAction,
  sharePoint,
  checkin

});

const mapDispatch = (dispatch) => ({
  deleteBookingRefAction: () => { dispatch(deleteBookingRefAction()) },
});


export default withRouter(connect(mapState, mapDispatch)(CheckInSummary));