import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isAndroid } from 'react-device-detect';
import Fonts from 'Unite/Shared/fonts';
import {
  textColor,
  buttonTextColor,
  buttonBackgroundColor,
  buttonBackgroundColorHover,
  divideColor,
  globalTransition
} from 'Unite/Theme/theme';

const Container = styled.div`
  padding: 10;
  padding-bottom: 0;
  padding-top: 20;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  border-bottom-color: ${divideColor};
  border-bottom: ${props => props.isLast ? 'none' : '1px solid'};
  padding-bottom: 20px;
  padding-top: 20px;
  width: 100%;
  transition: ${globalTransition};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 15px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  box-sizing: border-box;
  transition: ${globalTransition};
  width: 100%;
`;

const RightContent = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h2`
  color: ${textColor};
  font-family: ${Fonts.Lato};
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 3px;
  transition: ${globalTransition};
`;

const Subtitle = styled.p`
  color: ${textColor};
  font-family: ${Fonts.OpenSans};
  font-weight: 400;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 14px;
  transition: ${globalTransition};
`;

const Description = styled.p`
  color: ${textColor};
  font-family: ${Fonts.OpenSans};
  font-weight: 400;
  font-size: 14px;
  margin-top: 0;
  width: 87%;
  transition: ${globalTransition};
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto 20px auto;
  opacity: ${props => props.disabled ? 0.3 : 1};

`;

const IconImage = styled.img`
  width: 100%;
  height: auto;

  &.disabled {
    opacity: 0.3;
  }
`;

const AnchorButtonWrapper = styled.div`
  display: inline-flex;
  margin-right: 22px;
`;

const AnchorButton = styled.a`
  width: 75px;
  background-color: ${buttonBackgroundColor};
  transition: ${globalTransition};
  border: 0;
  color: ${buttonTextColor};
  font-family: ${Fonts.Lato};
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  ${props => props.styles}
  &:hover{
    color: white;
    background-color: ${buttonBackgroundColorHover};
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
    &:hover{
      color: ${buttonTextColor};
      background-color: ${buttonBackgroundColor};
    }
  }
`;

function TabListItem(props) {
  const { item, isLast } = props;

  const StoreAnchor = (item) => (
    <AnchorButtonWrapper>
        <AnchorButton href={isAndroid ? item.storeUrls.android : item.storeUrls.ios} title="Visit the store page" disabled={item.disabled} target="_blank">Get app</AnchorButton>
      </AnchorButtonWrapper>
  );

  const LinkAnchor = (item) => (
    <AnchorButtonWrapper>
        <AnchorButton href={item.linkAddress} title="Visit site" disabled={item.disabled} target="_blank">Visit site</AnchorButton>
      </AnchorButtonWrapper>
  );

  const AppAnchor = (item) => (
    <AnchorButtonWrapper>
        <AnchorButton title={'Open'} disabled={item.disabled} onClick={() => window.open(item.deepLink)}>Open app</AnchorButton>
      </AnchorButtonWrapper>
  );

  const buttonFactory = (props) => {
    if (props.deepLink) {
      return (
        <div>
          <AppAnchor {...props} />
        </div>
      );
    };

    return (
      <div>
        {item.storeUrls && <StoreAnchor {...props} />}
        {item.linkAddress && <LinkAnchor {...props} />}
      </div>
    );
  }

  var subtitle = "Website link";
  if (item.deepLink || !item.linkAddress) {
    subtitle = "Application download";
  }
  else if (item.storeUrls && item.linkAddress) {
    subtitle = "Website link and application download";
  } 

  return (
    <Container className={item.disabled && 'disabled'}>
      <Card isLast={isLast}>
        <LeftContainer>
          <IconContainer disabled={item.disabled}>
            <IconImage src={item.image} alt={item.name} className={item.disabled && 'disabled'} />
          </IconContainer>
        </LeftContainer>
        <RightContainer>
          <RightContent>
              <Title>{item.title}</Title>
              <Subtitle>{subtitle}</Subtitle>
              <Description>{item.introduction} <strong>{item.name}</strong>.</Description>
              {buttonFactory(item)}
          </RightContent>
        </RightContainer>
      </Card>
    </Container>
  )
}

TabListItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool,
};

export default TabListItem;