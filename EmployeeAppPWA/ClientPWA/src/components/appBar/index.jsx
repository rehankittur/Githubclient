import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { animated } from "react-spring";
import { NavLink } from "react-router-dom";

import LogoSvg from "Unite/Shared/logo";
import Colours from "Unite/Shared/colours";
import { onSetSlot } from "Unite/Store/actions/timeLine";
import {
  globalTransition,
  barsBackground,
  appBarrLogoBorderColour,
} from "Unite/Theme/theme";
import Fonts from "Unite/Shared/fonts";
import { authProvider } from "Unite/Components/authProvider";
import Overlay from "Unite/Shared/overlay";
import MenuLink from "Unite/Components/navMenu/menuLink";
import useWindowSize from "Unite/Utils/getWindowSize";
import ScreenSize, { Breakpoints } from "Unite/Utils/mediaqueries";
import { isSafari } from "Unite/Utils/browserUtils";

import { ResetCustomerDataAction } from '../../store/actions/checkin';

export const AppBarHeight = ScreenSize.largeUp ? 85 : 60;

const BarWrapper = styled.div`
  background: ${barsBackground};
  height: ${AppBarHeight}px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${globalTransition};
`;

const IconWrapper = styled(animated.div)`
  border: 1px solid ${appBarrLogoBorderColour};
  transition: ${globalTransition};
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 20px;
`;

const MenuButton = styled.a`
  margin-right: 20px;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-family: ${Fonts.Lato};
  ${ScreenSize.largeUp} {
    margin-right: 0px;
    width: 100px;
    padding-top: 25px;
    padding-bottom: 10px;
  }
`;

const Icon = styled.div`
  font-size: 33px;
  color: ${Colours.black};
  ${ScreenSize.largeUp} {
    font-size: 24px;
    padding-bottom: 8px;
  }
`;

const UserName = styled.div`
  font-family: ${Fonts.Lato};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  transition: ${globalTransition};
`;
const MenuContainer = styled.div`
  background-color: ${Colours.greyMedium};
  color: white;
  padding: 40px 30px 40px 30px;
  position: relative;
  box-sizing: border-box;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const LoginLink = styled.a`
  font-family: ${Fonts.Lato};
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
`;

const Version = styled.div`
  position: absolute;
  bottom: 30px;
  right: 20px;
  font-family: ${Fonts.Lato};
  font-size: 14px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.7);
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.2);
`;

const LinkWrapper = styled.div`
  width: 100px;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: ${Colours.black};
  font-family: ${Fonts.Lato};
  height: 100%;
  font-size: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: ${isSafari() ? "10px" : "109px"};
  height: 100%;
`;

const MenuLogoutLink = ({ handleMenuToggle, showLabel }) => {
  return (
    <MenuButton onClick={() => handleMenuToggle()}>
      <Icon className="icon-user" />
      {showLabel && "Log-out"}
    </MenuButton>
  );
};

// don't render news feed in desktop if agent is safari
const LinkWrappers = ({ handleMenuToggle, handleClick }) => (
  <>
    {!isSafari() && (
      <LinkWrapper>
        <MenuLink
          label="News feed"
          to="/"
          activeOnlyWhenExact={true}
          icon="icon-property"
        />
      </LinkWrapper>
    )}
    <LinkWrapper>
      <MenuLink
        label="Useful links"
        to="/useful-links"
        activeOnlyWhenExact={false}
        icon="icon-Useful-links"
      />
    </LinkWrapper>
    <LinkWrapper onClick={handleClick}>
      <MenuLink
        label="Check-in"
        to="/checkin-feature"
        activeOnlyWhenExact={false}
        icon="icon-mappin"
      />
    </LinkWrapper>
    <LinkWrapper>
      <MenuLogoutLink handleMenuToggle={handleMenuToggle} showLabel={true} />
    </LinkWrapper>
  </>
);

const MenuLinks = ({ handleMenuToggle , handleClick}) => {
  const { width } = useWindowSize();
  if (width >= Breakpoints.large) {
    return (
      <FlexContainer>
        <LinkWrappers handleMenuToggle={handleMenuToggle} handleClick={handleClick}/>
      </FlexContainer>
    );
  }
  return <MenuLogoutLink handleMenuToggle={handleMenuToggle} />;
};

const AppBar = ({ onSetSlot, account, resetCustomerDataAction }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    onSetSlot('logout');
    authProvider.logout();
  };

  const handleMenuToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleClick = () => {
    resetCustomerDataAction();
  };

  return (
    <>
      <BarWrapper>
        <IconWrapper>
          <NavLink to={'/'}>
            <LogoSvg />
          </NavLink>
        </IconWrapper>
        <MenuLinks handleMenuToggle={handleMenuToggle} handleClick={handleClick} />
      </BarWrapper>
      <Overlay show={toggleMenu} onClose={handleMenuToggle} top={AppBarHeight}>
        <MenuContainer>
          <CloseButton onClick={() => handleMenuToggle()} className="icon-Exit" />
          <UserName>{account && account.name}</UserName>
          <LoginLink onClick={handleLogout}>Log out</LoginLink>
          <Version>v{process.env.REACT_APP_VERSION}</Version>
        </MenuContainer>
      </Overlay>
    </>
  );
};

const mapState = ({ auth }) => ({
  account: auth.aadResponse ? auth.aadResponse.account : null,
});

const mapDispatch = (dispatch) => ({
  resetCustomerDataAction: () => dispatch(ResetCustomerDataAction()),
  onSetSlot: (slot) => {
    dispatch(onSetSlot(slot));
  },
});

export default connect(mapState, mapDispatch)(AppBar);
