/*
 * Global Constants
 */
const AppVersion = '0.1.1'
const DappName = 'Polkadot Technical Fellowship Dashboard'
const PolkadotUrl = 'https://polkadot-fellows.github.io/dashboard'

const GithubOwner = 'polkadot-fellows'
const GithubRfc = 'RFCs'
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

const collapsedWidth = '6rem'
const uncollapsedWidth = '16rem'
const type = 'inline'

type RankInfoType = {
  rank: number
  dan: string
  name: string
  color: string
  salary: number
}

// Page constants
const rankInfo: RankInfoType[] = [
  { rank: 0, dan: '', name: 'Candidate', color: '#00FF00', salary: 0 },
  { rank: 1, dan: 'I', name: 'Member', color: '#0000FF', salary: 10000 },
  { rank: 2, dan: 'II', name: 'Proficient', color: '#00FFFF', salary: 20000 },
  { rank: 3, dan: 'III', name: 'Fellow', color: '#008000', salary: 80000 },
  { rank: 4, dan: 'IV', name: 'Architect', color: '#FFFF00', salary: 120000 },
  {
    rank: 5,
    dan: 'V',
    name: 'Architect Adept',
    color: '#FFA500',
    salary: 160000,
  },
  {
    rank: 6,
    dan: 'VI',
    name: 'Grand Architect',
    color: '#784E00',
    salary: 200000,
  },
  {
    rank: 7,
    dan: 'VII',
    name: 'Free Master',
    color: '#FFC0CB',
    salary: 200000,
  },
  {
    rank: 8,
    dan: 'VIII',
    name: 'Master Constant',
    color: '#FF00FF',
    salary: 200000,
  },
  {
    rank: 9,
    dan: 'IX',
    name: 'Grand Master',
    color: '#FFD700',
    salary: 200000,
  },
]

/*
 * colors
 */

const lightTheme = {
  primary: '#f8f7f7',
  invert: '#2D292D',
  invertTertiarty: '#FF2097',
  accent: '#E6007A',
  colorFillAlter: '#eee',
  colorBgContainer: '#f8f7f7',
  colorBgElevated: '#E5E5E5',
  warning: '#FFA500',
  success: '#32CD32',
}

const darkTheme = {
  primary: '#2D292D',
  invert: '#f8f7f7',
  invertTertiarty: '#FF2097',
  accent: '#E6007A',
  colorFillAlter: '#242024',
  colorBgContainer: '#2D292D',
  colorBgElevated: '#221F22',
  warning: '#FFFF00',
  success: '#32CD32',
}

// AntD Tokens
const lightTokens = {
  components: {
    Menu: {
      itemColor: lightTheme.accent,
      itemSelectedBg: lightTheme.accent,
    },
    Drawer: {
      colorSplit: 'rgba(0, 0, 0, 0)',
      colorIcon: lightTheme.invert,
    },
  },
  token: {
    colorPrimary: lightTheme.invert,
    colorFillAlter: lightTheme.colorFillAlter,
    colorBgElevated: lightTheme.colorBgElevated,
    colorText: lightTheme.invert,
    colorTextTertiary: lightTheme.invertTertiarty,
    colorBgContainer: lightTheme.colorBgContainer,
    colorBgLayout: lightTheme.colorBgContainer,
  },
}

const darkTokens = {
  components: {
    Menu: {
      itemColor: darkTheme.accent,
      itemSelectedBg: darkTheme.accent,
      darkSubMenuItemBg: darkTheme.colorFillAlter,
    },
    Drawer: {
      colorTextTertiary: darkTheme.invertTertiarty,
      colorSplit: 'rgba(0, 0, 0, 0)',
      colorIcon: darkTheme.invert,
    },
  },
  token: {
    itemSelectedColor: darkTheme.primary,
    colorPrimary: darkTheme.accent,
    colorFillAlter: darkTheme.colorFillAlter,
    colorBgElevated: darkTheme.colorBgElevated,
    colorText: darkTheme.invert,
    colorTextTertiary: lightTheme.invertTertiarty,
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
  // site details
  rankInfo,
  // colors
  lightTheme,
  darkTheme,
  lightTokens,
  darkTokens,
}
