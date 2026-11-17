export const DappName = 'Polkadot Technical Fellowship Dashboard'

export const GithubOwner = 'polkadot-fellows'
export const GithubUrl = `https://github.com/${GithubOwner}`
export const RfcRepoUrl = `${GithubUrl}/RFCs`
export const RfcApiUrl = `https://api.github.com/repos/${GithubOwner}/RFCs`
export const ManifestoUrl = `${GithubUrl}/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf`

export type RankInfo = {
  rank: number
  /** Roman numeral of the "Dan" */
  dan: string
  name: string
  /** Badge background and foreground colors */
  color: string
  textColor: string
  /** Yearly salary, in USD */
  salary: number
}

const ranks: [string, string, string, string, number][] = [
  ['', 'Candidate', '#738DFF', '#0b1030', 0],
  ['I', 'Member', '#3535FF', '#ffffff', 10_000],
  ['II', 'Proficient', '#2A12B8', '#ffffff', 20_000],
  ['III', 'Fellow', '#008000', '#ffffff', 80_000],
  ['IV', 'Architect', '#00BF63', '#04240f', 120_000],
  ['V', 'Architect Adept', '#C8D630', '#262a00', 160_000],
  ['VI', 'Grand Architect', '#D30000', '#ffffff', 200_000],
  ['VII', 'Free Master', '#E6007A', '#ffffff', 200_000],
  ['VIII', 'Master Constant', '#FF00FF', '#2b002b', 200_000],
  ['IX', 'Grand Master', '#FFD700', '#2b2400', 200_000],
]

export const rankInfo: RankInfo[] = ranks.map(
  ([dan, name, color, textColor, salary], rank) => ({
    rank,
    dan,
    name,
    color,
    textColor,
    salary,
  }),
)

export const getRank = (rank: number): RankInfo =>
  rankInfo[rank] ?? {
    rank,
    dan: String(rank),
    name: `Rank ${rank}`,
    color: '#888888',
    textColor: '#ffffff',
    salary: 0,
  }
