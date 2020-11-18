export const Breakpoints = {
  small: 480,
  medium: 768,
  large: 1032,
  wide: 1200
};

const ScreenSize = {
  extrasmall: `@media only screen and (max-width: ${Breakpoints.small - 1}px)`,
  small: `@media only screen and (min-width: ${Breakpoints.small}px) and (max-width: ${Breakpoints.medium - 1}px)`,
  smallUp: `@media only screen and (min-width: ${Breakpoints.small}px)`,
  medium: `@media only screen and (min-width: ${Breakpoints.medium}px) and (max-width: ${Breakpoints.large -1}px)`,
  mediumUp: `@media only screen and (min-width: ${Breakpoints.medium}px)`,
  large: `@media only screen and (min-width: ${Breakpoints.large}px) and (max-width: ${Breakpoints.wide - 1}px)`,
  largeUp: `@media only screen and (min-width: ${Breakpoints.large}px)`,
  wide: `@media only screen and (min-width: ${Breakpoints.wide}px)`,
};

export default ScreenSize;
