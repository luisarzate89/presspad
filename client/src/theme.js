import {
  MOBILE_S_WIDTH,
  MOBILE_M_WIDTH,
  MOBILE_L_WIDTH,
  MOBILE_XL_WIDTH,
  TABLET_WIDTH,
  LAPTOP_WIDTH,
  LAPTOP_L_WIDTH,
  DESKTOP_WIDTH,
} from './constants/screenWidths';

// media queries
export const size = {
  mobileS: `${MOBILE_S_WIDTH}px`,
  mobileM: `${MOBILE_M_WIDTH}px`,
  mobileL: `${MOBILE_L_WIDTH}px`,
  mobileXL: `${MOBILE_XL_WIDTH}px`,
  tablet: `${TABLET_WIDTH}px`,
  laptop: `${LAPTOP_WIDTH}px`,
  laptopL: `${LAPTOP_L_WIDTH}px`,
  desktop: `${DESKTOP_WIDTH}px`,
};

export const breakpoints = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileXL: `(min-width: ${size.mobileXL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

const colorCodes = {
  // primary (darkblue)
  primary: '#08294A',
  lightPrimary: '#6C8FB2',
  extraLightPrimary: '#CFE4F9',

  // secondary (lightBlue)
  secondary: '#09C7E7',
  lightSecondary: '#A5EAF6',
  extraLightSecondary: '#CDF3FA',
  graySecondary: '#7C8CA1',

  // negative/error/cancel, reject and confirm
  red: '#EA5254',
  orange: '#E8841F',
  green: '#5BAF93',
  blue: '#0A7AE7',
  yellow: '#ffc069',
  redSecond: '#BC0000',

  // fontcolors
  fontPrimary: '#07294A',
  fontBlack: '#313234',
  fontLightBlack: '#393939',

  // borders
  borderGray: '#d9d9d9',

  // general
  white: '#FFFFFF',
  grayWhite: 'fbfbfb',
  lightGray: '#979797',
  gray: '#545455',
  blueGray: '#F2F6FA',
  lightBlue: '#0ac7e7',
  black: '#000000',

  // transparent
  transGray: 'rgba(84, 84, 85, 0.4)',
};

// general colors
export const colors = {
  ...colorCodes,
  primaryText: colorCodes.fontLightBlack,
  links: colorCodes.secondary,
  placeholderText: colorCodes.graySecondary,
};

// shadows
export const shadows = {
  main: '0px 0px 24px rgba(0, 0, 0, 0.04)',
  card: '0px 0px 24px rgba(0, 0, 0, 0.04)',
  pic: '0px 2px 24px rgba(0, 0, 0, 0.215882)',
  stripeBorder: '0px 0px 0px 2px rgba(24, 144, 255, 0.2)',
};

// borders
export const borders = {
  inputBox: `1px solid ${colors.graySecondary}`,
  divider: `1px solid ${colors.lightGray}`,
  stripeBorder: `1px solid ${colors.borderGray}`,
  error: `1px solid ${colors.red}`,
  lightDivider: '1px solid rgba(0, 0, 0, 0.1)',
};

//  set colours for tags in the table
export const tagColors = {
  'Looking for host': colors.primary,
  'At host': colors.green,
  'Pending request': colors.orange,
  new: colors.lightGray,
};

//  set colours for tags in the table
export const bookingStatus = {
  pending: colors.orange,
  confirmed: colors.green,
  canceled: colors.red,
  completed: colors.gray,
};
