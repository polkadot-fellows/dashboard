import { useFellowshipMembers } from '@/queries/useFellowshipMembers'
import { RequestsGrid } from './RequestsGrid'
import Content from './Content.mdx'

type Props = {
  lcStatus: boolean
}

export const About = ({ lcStatus }: Props) => {
  const { data: members } = useFellowshipMembers(lcStatus)

  return (
    <main>
      <Content />
      <h1>{`${members?.length || ''} Members`}</h1>

      <p>
        List of members and candidates currently inducted in the Fellowship
        Collective.
      </p>
      
      <div>
        <RequestsGrid lcStatus={lcStatus} />
      </div>
    </main>
  )
}
