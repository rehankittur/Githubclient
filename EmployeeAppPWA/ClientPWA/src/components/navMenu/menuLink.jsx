import React from 'react';
import styled from 'styled-components';
import {
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import Fonts from 'Unite/Shared/fonts';
import Colours from 'Unite/Shared/colours';
import { analyticsService } from 'Unite/Services/analyticsService';
import ScreenSize from 'Unite/Utils/mediaqueries';
import { isSafari } from 'Unite/Utils/browserUtils';

const MenuNavLink = styled(NavLink)`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: ${Colours.black};
  font-family: ${Fonts.Lato};
  height: 100px;
  background: ${props => props.active ? Colours.yellowPale : Colours.yellow};
  ${ScreenSize.largeUp}{
    height: 100%;
    width: 100%;
    padding-top: 25px;
    padding-bottom: 10px;
    }
`;

const Icon = styled.div`
  color: ${Colours.black};
  font-size: 30px;
  ${ScreenSize.largeUp}{
    font-size: 24px;
    padding-bottom:8px;
    }
`;

const IconSmaller = styled(Icon)`
  font-size: 26px;
  padding-bottom: 3px;
  ${ScreenSize.largeUp}{
    padding-bottom:8px;
    }
`

const sendPageViews = (match) => {
  // there is separate handling of useful links page so that we can support sending the category
  const pathForUsefulLinks = isSafari() ? '' : '/useful-links';

  if (match && match.path != pathForUsefulLinks) {
    analyticsService.sendPageView(match.path, `${document.title}`);
  }
}

const MenuLink = ({ label, to, activeOnlyWhenExact, icon }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  console.log(match);
  sendPageViews(match);
  return (
    <MenuNavLink to={to} active={match}>
      {icon === 'icon-Useful-links'
        ? <IconSmaller className={icon} />
        : <Icon className={icon} />
      }

      {label}
    </MenuNavLink>
  );
}

export default MenuLink;
