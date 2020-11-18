import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Msal from "msal";
import styled from 'styled-components';
import Article from '../cards/article';
import { H1 } from '../shared/typography';
import { authWithSharepoint, loadNewsPosts, callDebug } from 'Unite/Store/actions/sharePointAction';
import LoadingIndicator from 'Unite/Shared/loadingIndicator';
import sharePointEnum from 'Unite/Utils/sharePointEnum';
import Button from 'Unite/Shared/button/button';
import Fonts from 'Unite/Shared/fonts';
import ScreenSize from 'Unite/Utils/mediaqueries';
import Grid from 'Unite/Shared/grid/grid';

const Container = styled.div`
  padding: 35px 20px 20px 20px;
  ${ScreenSize.largeUp}{
    margin: 0 auto;
    max-width: 1005px;
  }
`;

const EndText = styled.p`
  color: white;
  text-align: center;
  font-weight: bold;
  font-family: ${Fonts.Lato};
  padding-top: 15px;
`;

function News(props) {

  const [numberToLoad] = useState(10);
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    props.authWithSharepoint();
  }, []);

  useEffect(() => {
    if (props.sharePoint && props.sharePoint.accessToken) {
      props.loadNewsPosts();
    }
  }, [props.sharePoint.accessToken]);

  const loadMore = () => {
    var num = amount + numberToLoad;
    props.loadNewsPosts(num);
    setAmount(num);
  }

  const debug = () => {
    props.callDebug();
  }

  return (

    <Container>
      <H1>News feed</H1>

      {props.sharePoint.initializing ? <LoadingIndicator message="Logging you in..." /> : null}

      {
        !props.sharePoint.initializing && props.sharePoint.posts.items &&
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={props.sharePoint.posts.items.length} //This is important field to render the next data
          next={loadMore}
          hasMore={props.sharePoint.posts.hasMore}
          loader={<LoadingIndicator message="Loading news..." />}
          endMessage={
            <EndText>
              You are all up to date.
            </EndText>
          }
        >
          <Grid>
            {
              props.sharePoint.posts.items.map((article, index) =>
                <Article {...article} key={article.GUID} />)
            }
          </Grid>
        </InfiniteScroll>
      }
    </Container>
  )
}

const mapState = ({ news, sharePoint }) => ({
  news: news,
  loadNewsPosts,
  authWithSharepoint,
  sharePoint,
  accessToken: sharePoint.accessToken,
  callDebug
});

const mapDispatch = (dispatch) => ({
  loadNewsPosts: (page) => { dispatch(loadNewsPosts(page)) },
  authWithSharepoint: () => { dispatch(authWithSharepoint()) },
  callDebug: () => { dispatch(callDebug()) },
});

News.propTypes = {
  loadNewsPosts: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(News);

