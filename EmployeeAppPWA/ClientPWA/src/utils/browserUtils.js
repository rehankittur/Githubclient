import Bowser from "bowser";

export const isSafari = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return browser.isBrowser('safari');
}