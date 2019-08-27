// media queries
export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  mobileXL: "680px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
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
  desktopL: `(min-width: ${size.desktop})`
};

const colorCodes = {
  // primary (darkblue)
  primary: "#08294A",
  lightPrimary: "#6C8FB2",
  extraLightPrimary: "#CFE4F9",

  // secondary (lightBlue)
  secondary: "#09C7E7",
  lightSecondary: "#A5EAF6",
  extraLightSecondary: "#CDF3FA",
  graySecondary: "#7C8CA1",

  // negative/error/cancel, reject and confirm
  red: "#EA5254",
  orange: "#E8841F",
  green: "#5BAF93",
  blue: "#0A7AE7",

  // fontcolors
  fontPrimary: "#07294A",
  fontBlack: "#313234",
  fontLightBlack: "#393939",

  // general
  white: "#FFFFFF",
  grayWhite: "fbfbfb",
  lightGray: "#979797",
  gray: "#545455",
  blueGray: "#F2F6FA",
  lightBlue: "#0ac7e7",
  black: "#000000",

  // transparent
  transGray: "rgba(84, 84, 85, 0.4)"
};

// general colors
export const colors = {
  ...colorCodes,
  primaryText: colorCodes.fontLightBlack,
  links: colorCodes.secondary,
  placeholderText: colorCodes.graySecondary
};

// shadows
export const shadows = {
  main: "0px 0px 24px rgba(0, 0, 0, 0.04)",
  card: "0px 0px 24px rgba(0, 0, 0, 0.04)",
  pic: "0px 2px 24px rgba(0, 0, 0, 0.215882)"
};

// borders
export const borders = {
  inputBox: `1px solid ${colors.graySecondary}`,
  divider: `1px solid ${colors.lightGray}`,
  lightDivider: "1px solid rgba(0, 0, 0, 0.1)"
};

//  set colours for tags in the table
export const tagColors = {
  "Looking for host": colors.primary,
  "At host": colors.green,
  "Pending request": colors.orange,
  new: colors.lightGray
};
