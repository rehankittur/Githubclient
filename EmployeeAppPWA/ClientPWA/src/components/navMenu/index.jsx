import React from "react";
import styled from "styled-components";
import Colours from "Unite/Shared/colours";
import MenuLink from "./menuLink";
import { isSafari } from "Unite/Utils/browserUtils";

const Container = styled.nav`
  position: sticky;
  bottom: 0;
  background: ${Colours.yellowPale};
  height: 100px;
  flex: 1;
  border-top: 2px solid white;
`;

const Menu = styled.ul`
  display: flex;
  flex: 1;
  justify-content: column;
  margin: 0;
  padding: 0;
  position: relative;
  height: 100px;
`;

const Item = styled.li`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

// don't render news feed in mobile view if agent is safari
const NavMenu = () => (
  <Container>
    <Menu>
      {!isSafari() && (
        <Item>
          <MenuLink
            label="News feed"
            to="/"
            activeOnlyWhenExact={true}
            icon="icon-property"
          />
        </Item>
      )}
      <Item style={{ borderWidth: 1 }}>
        <MenuLink
          label="Useful links"
          to="/useful-links"
          activeOnlyWhenExact={false}
          icon="icon-Useful-links"
        />
      </Item>
      <Item style={{ borderWidth: 1 }}>
        <MenuLink
          label="Check-in"
          to="/checkin-feature"
          activeOnlyWhenExact={false}
          icon="icon-mappin"
        />
      </Item>
    </Menu>
  </Container>
);

export default NavMenu;
