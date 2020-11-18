import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import categoriesItems from '../../data';
import TabListItem from './tabListItem';
import Fonts from '../shared/fonts';
import { textColor, globalTransition } from '../../theme/theme';
import { H1 } from 'Unite/Shared/typography';
import { useLocation } from 'react-router-dom'
import { analyticsService } from 'Unite/Services/analyticsService';

const Container = styled.div`
  position: relative;
  /* height: 100%; */
  padding-top: 40px;
`;

const Tab = styled.div`
  padding: 15;
  min-height: 100;
  color: ${textColor};
  padding: 0 20px;
`;

const Title = styled(H1)`
  font-family: ${Fonts.Lato};
  /* font-weight: 400; */
  color: ${textColor};
  transition: ${globalTransition};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
`;

const SwipeText = styled.p`
  font-family: ${Fonts.Lato};
  font-size: 16px;
  margin: 0;
  padding-bottom: 1px;
  cursor: default;
`;

const Icon = styled.div`
  color: white;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
`;

const UsefulTabs = props => {
  let location = useLocation();

  const { index } = props;
  const [stepIndex, setStepIndex] = useState(index ? index : 0);
  const maxElements = categoriesItems.length;

  let titles = [];

  useEffect(() => window.scrollTo(0, 0), [props.index]);

  useEffect(() => analyticsService.sendPageView(location.pathname, `${document.title} - ${categoriesItems[stepIndex].name}`),
   [stepIndex]);

  const onClickNext = () => {
    if (stepIndex !== (maxElements - 1)) {
      setStepIndex(stepIndex + 1)
    } else {
      setStepIndex(0)
    }
  }

  const onClickPrevious = () => {
    if (stepIndex !== 0) {
      setStepIndex(stepIndex - 1)
    } else {
      setStepIndex(maxElements - 1)
    }
  }

  return (
    <Container>
      {/* <SwipeableViews>
      {categoriesItems.map((category, index) => (
        <Title>{category.name}</Title>
      ))}
      </SwipeableViews> */}
      {/* <ActiveLine width={100} /> */}
      <SwipeableViews index={stepIndex} onChangeIndex={() => window.scrollTo(0, 0)}>
        {categoriesItems.map((category, index) => (
          <Tab key={`tab$-${index}`}>
            <TitleContainer>
              <Title ref={ref => titles[index] = ref}>{category.name}</Title>
              <IconsContainer>
                <Icon className={'icon-leftarrow'} onClick={onClickPrevious} />
                <SwipeText>Swipe</SwipeText>
                <Icon className={'icon-rightarrow'} onClick={onClickNext} />
              </IconsContainer>
            </TitleContainer>
            <div>
              {category.items.map((item, index, arr) => (
                <TabListItem item={item} key={`item-${index}`} isLast={arr.length - 1 === index} />
              ))}
            </div>
          </Tab>
        ))}
      </SwipeableViews>
    </Container>
  );
};

UsefulTabs.propTypes = {
  index: PropTypes.number,
};

const mapState = ({ usefulInfoTab, timeLine }) => ({
  index: usefulInfoTab.index,
  slot: timeLine.slot,
});

export default connect(mapState, null)(UsefulTabs);