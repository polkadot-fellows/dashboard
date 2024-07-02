/*
 * Global Constants
 */
const AppVersion = "0.1.0"
const DappName = "Polkadot Fellowship Dashboard"
const PolkadotUrl = "https://polkadot-fellows.github.io/dashboard"

const GithubOwner = "polkadot-fellows"
const GithubRfc = "RFCs"
const GithubApiUrl = `https://api.github.com/repos/${GithubOwner}/${GithubRfc}`

const SideMenuMaximisedWidth = 185
const SideMenuMinimisedWidth = 75
const SideMenuStickyThreshold = 1150
const SectionFullWidthThreshold = 1000
const ShowAccountsButtonWidthThreshold = 825
const FloatingMenuWidth = 250
const SmallFontSizeMaxWidth = 600
const TipsThresholdSmall = 750
const TipsThresholdMedium = 1200

const collapsedWidth = "6rem"
const uncollapsedWidth = "16rem"
const type = "inline"

/*
 * colors
 */

const lightTheme = {
  primary: "#f8f7f7",
  invert: "rgb(45 41 45)",
  accent: "#E6007A",
  colorFillAlter: "#eee",
  colorBgContainer: "#f8f7f7",
}

const darkTheme = {
  primary: "rgb(45 41 45)",
  invert: "#f8f7f7",
  accent: "#E6007A",
  colorFillAlter: "rgb(36 32 36)",
  colorBgContainer: "rgb(45 41 45)",
}

// AntD Tokens
const lightTokens = {
  components: {
    Menu: {
      itemColor: lightTheme.accent,
      itemSelectedBg: lightTheme.accent,
      colorPrimary: lightTheme.invert,
      colorBgContainer: lightTheme.colorBgContainer,
      colorFillAlter: lightTheme.colorFillAlter,
    },
  },
  token: {
    colorText: lightTheme.invert,
    colorBgContainer: lightTheme.colorBgContainer,
    colorBgLayout: lightTheme.colorBgContainer,
  },
}

const darkTokens = {
  components: {
    Menu: {
      itemColor: darkTheme.accent,
      itemSelectedBg: darkTheme.accent,
      itemSelectedColor: darkTheme.primary,
      colorPrimary: darkTheme.accent,
      colorBgContainer: darkTheme.colorBgContainer,
      colorFillAlter: darkTheme.colorFillAlter,
      darkSubMenuItemBg: darkTheme.colorFillAlter,
    },
  },
  token: {
    colorText: darkTheme.invert,
    colorBgContainer: darkTheme.colorBgContainer,
    colorBgLayout: darkTheme.colorBgContainer,
  },
}

// Exports
export {
  AppVersion,
  DappName,
  PolkadotUrl,
  GithubOwner,
  GithubRfc,
  GithubApiUrl,
  SideMenuMaximisedWidth,
  SideMenuMinimisedWidth,
  SideMenuStickyThreshold,
  SectionFullWidthThreshold,
  ShowAccountsButtonWidthThreshold,
  FloatingMenuWidth,
  SmallFontSizeMaxWidth,
  TipsThresholdSmall,
  TipsThresholdMedium,
  collapsedWidth,
  uncollapsedWidth,
  type,
  lightTheme,
  darkTheme,
  lightTokens,
  darkTokens,
}
