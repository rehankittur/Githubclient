import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { formatDateShort } from 'Unite/Utils/date';
import Fonts from 'Unite/Shared/fonts';
import sharePointEnum from 'Unite/Utils/sharePointEnum';
import { H2 } from 'Unite/Shared/typography';
import Bullet from './bullet';
import {
  textColor,
} from 'Unite/Theme/theme';

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  padding-bottom: 28px;
  /* margin: 28px; */
  margin-bottom: 20px;
  border-bottom: 1px solid #535353;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const Created = styled.span`
  /* flex: 1; */
  color: ${textColor};
  font-family: ${Fonts.OpenSans};
  font-size: 14px;
  font-weight: 300;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const Anchor = styled.a`
  border: 0;
  cursor: pointer;
  text-decoration: none;
`;

const Taxonomy = styled.span`
  /* flex: 1; */
  color: ${textColor};
  font-family: ${Fonts.Lato};
  font-size: 16px;
  font-weight: normal;
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Term = styled.div`
  margin-left: 5px;
  color: ${textColor};
  font-family: ${Fonts.OpenSans};
  font-size: 14px;
`;

const Title = styled.h2`
  color: ${textColor};
  font-family: ${Fonts.OpenSans};
  font-size: 18px;
  font-weight: 300;
  margin: 0;
`;

function Article(props) {
  return (
    <Container>
      <Header>
        <Created>{formatDateShort(props.Created)}</Created>
        {props.TaxCatchAll && props.TaxCatchAll.results !== [] && 
          <Taxonomy>
            {props.TaxCatchAll.results.map((term, index) => (
            <Fragment key={`term-${index}`}>
              <Bullet style={{ marginLeft: 5 }}/>
              <Term>{term.Term}</Term>
            </Fragment>
          ))}</Taxonomy>
        }
      </Header>
      <Anchor href={`${sharePointEnum.SHAREPOINT_ROOT_URL}${props.FileRef}`} target="_blank">
          {props.BannerImageUrl && <Img src={props.BannerImageUrl.Url} />}
        <Title>{props.Title}</Title>
      </Anchor>
    </Container>
  )
}

Article.propTypes = {
  Created: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  FileRef: PropTypes.string,
  TaxCatchAll: PropTypes.arrayOf(PropTypes.shape({
    Term: PropTypes.string,
  })),
  BannerImageUrl: PropTypes.shape({
    Description: PropTypes.string,
    Url: PropTypes.string,
  }),
}

export default Article

