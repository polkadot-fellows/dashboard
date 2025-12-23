/*
 * Global Constants
 */
const AppVersion = '0.2.0'
const DappName = 'Polkadot Technical Fellowship Dashboard'
const PolkadotUrl = 'https://polkadot-fellows.xyz'

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
const reusableH1 =
  'font-dm-serif text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'

// Page constants
const rankInfo: RankInfoType[] = [
  { rank: 0, dan: '', name: 'Candidate', color: '#738DFF', salary: 0 },
  { rank: 1, dan: 'I', name: 'Member', color: '#3535FF', salary: 10000 },
  { rank: 2, dan: 'II', name: 'Proficient', color: '#1A0099', salary: 20000 },
  { rank: 3, dan: 'III', name: 'Fellow', color: '#008000', salary: 80000 },
  { rank: 4, dan: 'IV', name: 'Architect', color: '#00BF63', salary: 120000 },
  {
    rank: 5,
    dan: 'V',
    name: 'Architect Adept',
    color: '#C8D630',
    salary: 160000,
  },
  {
    rank: 6,
    dan: 'VI',
    name: 'Grand Architect',
    color: '#D30000',
    salary: 200000,
  },
  {
    rank: 7,
    dan: 'VII',
    name: 'Free Master',
    color: '#E6007A',
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
  //Styling
  reusableH1,
}
