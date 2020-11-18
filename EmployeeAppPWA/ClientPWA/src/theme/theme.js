import theme from 'styled-theming';
import Colours from '../components/shared/colours';
import { rgba, lighten } from 'polished';

export const globalTransition = 'all 0.5s ease-in-out';

export const backgroundColor = theme('mode', {
  light: Colours.white,
  dark: Colours.black,
});

export const textColor = theme('mode', {
  light: Colours.black,
  dark: Colours.white,
});

export const buttonBackgroundColor = theme('mode', {
  light: Colours.sand,
  dark: Colours.yellow,
});

export const buttonBackgroundColorHover = theme('mode', {
  light: rgba(Colours.sand, 0.8),
  dark: rgba(Colours.yellow, 0.8),
})

export const buttonBackgroundColorDisabled= theme('mode', {
  light: rgba(Colours.sand, 0.3),
  dark: rgba(Colours.yellow, 0.3),
})

export const buttonTextColor = theme('mode', {
  light: Colours.black30,
  dark: Colours.black,
});

export const divideColor = theme('mode', {
  light: Colours.black30,
  dark: Colours.white,
});

export const barsBackground = theme('mode', {
  light: Colours.black,
  dark: Colours.yellow,
});

export const drawerCircleBackground = theme('mode', {
  light: Colours.yellow,
  dark: Colours.black,
});

export const drawerRowBackground = theme('mode', {
  light: lighten(0.1, Colours.black),
  dark: lighten(0.1, Colours.yellow),
});

export const drawerRowTextColor = theme('mode', {
  light: Colours.white,
  dark: Colours.black,
});

export const drawerRowTextColorActive = theme('mode', {
  light: Colours.yellow,
  dark: Colours.white,
});

export const appBarrLogoBorderColour = theme('mode', {
  light: Colours.white,
  dark: 'transparent',
})


