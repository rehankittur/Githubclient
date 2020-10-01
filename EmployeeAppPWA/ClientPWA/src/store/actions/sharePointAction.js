import * as Msal from "msal";
import { fetchNewsArticles } from '../../api';
import sharePointEnum from 'Unite/Utils/sharePointEnum';
import { uniqBy } from 'lodash';
import { authProvider } from 'Unite/Components/authProvider';
import config from '../../config';
import { isSafari } from 'Unite/Utils/browserUtils';

//------------- Sharepoint Rest API Auth -------------//

export const FetchSharePointAuthStart = 'FetchSharePointAuthStart';
export const onFetchSharePointAuthStart = () =>
  ({ type: FetchSharePointAuthStart });

export const FetchSharePointAuthFailure = 'FetchSharePointAuthFailure';
export const onFetchSharePointAuthFailure = () =>
  ({ type: FetchSharePointAuthFailure });

export const FetchSharePointAuthSuccess = 'FetchSharePointAuthSuccess';
export const onFetchSharePointAuthSuccess = () =>
  ({ type: FetchSharePointAuthSuccess });

export const SetSharePointToken = 'SetSharePointToken';
export const onSetSharePointToken = (accessToken) =>
  ({ type: SetSharePointToken, payload: accessToken });


export const authWithSharepoint = () => (dispatch, getState) => {

  const { sharePoint } = getState();
  console.log('..... SharePoint', sharePoint);

  const acquireRestTokenPopUp = () => {
    var msalConfig = {
      auth: {
        authority: 'https://login.microsoftonline.com/4eefdee3-6662-4480-b2ba-a102df9c5160',
        clientId: '23089bcf-1533-4191-9e27-836786569e41',
        redirectURI: config.redirectUri,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    };

    const requestObjRest = {
      scopes: [`${sharePointEnum.SHAREPOINT_ROOT_URL}/.default`]
    };

    const myMSALObj = new Msal.UserAgentApplication(msalConfig);

    myMSALObj.handleRedirectCallback((error, response) => {
      window.location.reload();
    });

    //let restToken = null;

    const getSharepointPages = () => {
      callSPRest(sharePointEnum.SHAREPOINT_REST_SITE_PAGE_URL, sharePoint.accessToken, restAPICallback);
    }

    const requiresInteraction = (errorCode) => {
      if (!errorCode || !errorCode.length) {
        return false;
      }
      return errorCode === "consent_required" ||
        errorCode === "interaction_required" ||
        errorCode === "login_required";
    }

    if (!getState().auth.aadResponse) {
      return;
    }

    // Safari does not allow 3rd party cookies by default so we can't get access token silently which is held in cookies.
    // We need to send request to get access token.
    if (isSafari()) {
      const authParams = {
        account: {
          accountIdentifier: getState().auth.aadResponse.account.accountIdentifier,
        },
        scopes: [`${sharePointEnum.SHAREPOINT_ROOT_URL}/.default`]
      }
      dispatch(onFetchSharePointAuthStart());
      authProvider.getAccessToken(authParams).then((response) => {
        dispatch(onSetSharePointToken(response.accessToken));
        dispatch(onFetchSharePointAuthSuccess());
        getSharepointPages();
      }).catch(error => {
        acquireTokenPopup(error);
      });
    }
    else {
      dispatch(onFetchSharePointAuthStart());
      //Always start with acquireTokenSilent to obtain a token in the signed in user from cache
      myMSALObj.acquireTokenSilent(requestObjRest).then(function (tokenResponse) {
        // restToken = tokenResponse.accessToken;
        dispatch(onSetSharePointToken(tokenResponse.accessToken));
        dispatch(onFetchSharePointAuthSuccess());
        getSharepointPages();
      }).catch(function (error) {
        // Upon acquireTokenSilent failure (due to consent or interaction or login required ONLY)
        // Call acquireTokenPopup(popup window) 
        acquireTokenPopup(error);
      });
    }

    const acquireTokenPopup = (error) => {
      if (requiresInteraction(error.errorCode)) {
        myMSALObj.acquireTokenPopup(requestObjRest).then(function (tokenResponse) {
          // restToken = tokenResponse.accessToken;
          dispatch(onSetSharePointToken(tokenResponse.accessToken));
          dispatch(onFetchSharePointAuthSuccess());
          getSharepointPages();
        }).catch(function (error) {
          dispatch(onFetchSharePointAuthFailure(error));
        });
      }
    }

    const callSPRest = (theUrl, accessToken, callback) => {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200)
          callback(JSON.parse(this.responseText));
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous
      xmlHttp.setRequestHeader('Authorization', 'Bearer ' + sharePoint.accessToken);
      xmlHttp.setRequestHeader("Accept", "application/json");
      xmlHttp.setRequestHeader("xhrFields", { withCredentials: true });
      xmlHttp.withCredentials = false;
      xmlHttp.send();
    }

    const restAPICallback = (data) => {
      // setData(data.value);
    }

  }

  const spAuth = () => {
    acquireRestTokenPopUp();
  }

  acquireRestTokenPopUp();
}

//------------- Site pages -------------//

export const FetchNewsPostsStart = 'FetchNewsPostsStart';
export const onFetchNewsPostsStart = () =>
  ({ type: FetchNewsPostsStart });

export const FetchNewsPostsFailure = 'FetchNewsPostsFailure';
export const onFetchNewsPostsFailure = () =>
  ({ type: FetchNewsPostsFailure });

export const FetchNewsPostsSuccess = 'FetchNewsPostsSuccess';
export const onFetchNewsPostsSuccess = (results) =>
  ({ type: FetchNewsPostsSuccess, payload: results });

export const FetchNewsNoMorePosts = 'FetchNewsNoMorePosts';
export const onFetchNewsNoMorePosts = (noMorePosts) =>
  ({ type: FetchNewsNoMorePosts, payload: noMorePosts });

const OldBackgroundImageUrlBase = 'https://unitestudentsyammer.sharepoint.com/sites/TheHub/SiteAssets/';
const NewBackgroundImageUrlBase = 'https://unitesharepointcdn.blob.core.windows.net/imgcdn/SiteAssets/';

export const loadNewsPosts = (amount = 10) => (dispatch, getState) => {
  const { sharePoint } = getState();
  // dispatch(onFetchNewsPostsStart());
  return fetchNewsArticles(`${sharePointEnum.SHAREPOINT_REST_SITE_PAGE_URL}&$top=${amount}`, sharePoint.accessToken)
    .then(items => {
      let preparedPosts = [];
      if (items && items.d && items.d.results) {
        preparedPosts = items.d.results.map((item) => {
          const bannerImageUrl = item.ImageUrl ? item.ImageUrl.Url.replace(OldBackgroundImageUrlBase, NewBackgroundImageUrlBase) : '';
          return { ...item, BannerImageUrl: { ...item.ImageUrl, Url: bannerImageUrl } };
        })
      }
      const sharepointItems = sharePoint.posts.items ? sharePoint.posts.items : [];
      const uniquePosts = uniqBy([...sharepointItems, ...preparedPosts], post => post.GUID)
      if (uniquePosts.length === sharepointItems.length) {
        return dispatch(onFetchNewsNoMorePosts(false));
      }
      return dispatch(onFetchNewsPostsSuccess(uniquePosts));
    })
    .catch(error => {
      dispatch(onFetchNewsPostsFailure(error))
    });
}

export const callDebug = () => (dispatch, getState) => {
  const { sharePoint } = getState();
  // dispatch(onFetchNewsPostsStart());
  return fetchNewsArticles(sharePointEnum.SHAREPOINT_REST_DEBUG_URL, sharePoint.accessToken)
    .then(response => {
      console.log('----DEBUG', response)
    })
    .catch(error => null);
}