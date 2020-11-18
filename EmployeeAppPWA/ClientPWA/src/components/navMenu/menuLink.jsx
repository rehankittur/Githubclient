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
  height: 66px;
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
  font-size: 19px;
  ${ScreenSize.largeUp}{
    font-size: 24px;
    padding-bottom:8px;
    }
`;

const IconSmaller = styled(Icon)`
  font-size: 19px;
  padding-bottom: 3px;
  ${ScreenSize.largeUp}{
    padding-bottom:8px;
    }
`
const IconLabelDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 7px;
  ${ScreenSize.largeUp}{
    display: block;
    margin-bottom: 0px;
  }
`;

const LabelDiv = styled.div`
  margin-left: 5px;
  font: bold 16px/19px Lato;
  ${ScreenSize.largeUp}{
    font-size: 10px;
    margin-left: 0px;
    font: inherit;
  }
`;

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
      <IconLabelDiv>
        {icon === 'icon-Useful-links'
          ? <IconSmaller className={icon} />
          : <Icon className={icon} />
        }
        <LabelDiv>{label}</LabelDiv>
      </IconLabelDiv>
    </MenuNavLink>
  );
}

export default MenuLink;
