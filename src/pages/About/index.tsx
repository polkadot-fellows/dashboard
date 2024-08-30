import { useFellowshipMembers } from '@/queries/useFellowshipMembers'
import { RequestsGrid } from './RequestsGrid'
import Content from './Content.mdx'

type Props = {
  lcStatus: boolean
}

export const About = ({ lcStatus }: Props) => {
  const { data: members } = useFellowshipMembers(lcStatus)

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[15%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <Content />
      <h1>{`${members?.length || ''} Members`}</h1>
      <div className="pageTop">
        List of members and candidates currently inducted in the Fellowship
        Collective.
      </div>
      <div style={{ paddingTop: '2rem' }}>
        <RequestsGrid lcStatus={lcStatus} />
      </div>
    </main>
  )
}
