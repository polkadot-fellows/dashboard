import { useEffect, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { A, ButtonLink, DocPage } from '@/components/page'
import { Skeleton } from '@/components/ui/skeleton'
import { RfcApiUrl, RfcRepoUrl } from '@/consts'

type PullRequest = {
  number: number
  title: string
  html_url: string
  created_at: string
  draft: boolean
  user: { login: string; html_url: string; avatar_url: string }
  labels: { name: string }[]
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

const OpenRfcs = () => {
  const [pulls, setPulls] = useState<PullRequest[] | 'error'>()

  useEffect(() => {
    fetch(`${RfcApiUrl}/pulls?per_page=100`)
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.status),
      )
      .then(setPulls, () => setPulls('error'))
  }, [])

  if (!pulls)
    return (
      <div className="not-prose space-y-3">
        {Array.from({ length: 4 }, (_, idx) => (
          <Skeleton key={idx} className="h-18 w-full rounded-lg" />
        ))}
      </div>
    )

  if (pulls === 'error')
    return (
      <p>
        The list of open RFCs could not be loaded from GitHub.{' '}
        <A href={`${RfcRepoUrl}/pulls`}>See them on GitHub instead</A>.
      </p>
    )

  if (!pulls.length) return <p>There are no open RFCs at the moment.</p>

  return (
    <ul className="not-prose !list-none divide-y rounded-lg border !p-0">
      {pulls.map((pull) => (
        <li key={pull.number}>
          <a
            href={pull.html_url}
            target="_blank"
            rel="noreferrer"
            className="hover:bg-muted/50 flex items-center gap-4 px-4 py-3 transition-colors"
          >
            <img
              src={`${pull.user.avatar_url}&s=80`}
              alt=""
              loading="lazy"
              className="bg-muted h-10 w-10 shrink-0 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-6 font-medium">
                <span className="text-muted-foreground font-normal tabular-nums">
                  #{pull.number}
                </span>{' '}
                {pull.title}
              </p>
              <p className="text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <span>
                  {pull.user.login} · opened {formatDate(pull.created_at)}
                </span>
                {pull.draft && (
                  <span className="rounded-full border px-2 py-0.5">Draft</span>
                )}
                {pull.labels.map(({ name }) => (
                  <span
                    key={name}
                    className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 font-medium"
                  >
                    {name}
                  </span>
                ))}
              </p>
            </div>
            <MessageSquare className="text-muted-foreground hidden h-4 w-4 shrink-0 sm:block" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export const Rfc = () => (
  <DocPage
    title="RFCs"
    lead="Requests for Comments are how changes to the standards administered by the Fellowship get proposed, discussed and decided."
    sections={[
      {
        id: 'about',
        title: 'What RFCs are',
        content: (
          <>
            <p>
              The <A href={RfcRepoUrl}>RFCs repository</A> contains proposals
              for change to standards administered by the Fellowship. RFCs are
              in practice only a signalling mechanism to determine and indicate
              the Fellowship's design and architecture preferences and to
              coordinate discussion and social consensus on architectures and
              designs according to open-source principles.
            </p>
            <p>
              For any RFC concerning runtime logic or interfaces, the
              Fellowship's capabilities are bounded by relay-chain governance,
              which is the ultimate decider of what code is adopted for block
              processing.
            </p>
            <p className="flex flex-wrap gap-3">
              <ButtonLink href="https://polkadot-fellows.github.io/RFCs/">
                Read the RFCs book
              </ButtonLink>
              <ButtonLink
                variant="outline"
                href="https://polkadottechnicalfellowship.notion.site/RFC-Dashboard-13396f88d0a7805c9827c7f3026fbb5e"
              >
                RFC dashboard
              </ButtonLink>
            </p>
          </>
        ),
      },
      {
        id: 'lifecycle',
        title: 'RFC lifecycle',
        content: (
          <>
            <p>
              The RFC process is open to all contributors. Anyone may open an
              RFC or provide comments on open RFCs.
            </p>
            <p>
              RFCs are submitted by PRs and undergo discussion before being put
              to an on-chain vote for decision by the Fellowship. A bot is set
              for proposing RFCs on-chain in a referendum: this can only be done
              by accounts that are part of the Fellowship.
            </p>
            <p>
              Once approved, an RFC will need to be taken by implementers
              (usually the authors of the RFC) who will complete all the
              required coding, testing, and documentation.
            </p>
            <p>
              PRs may be closed by their author, and also when sufficiently
              stale: after a period of 1 year without acceptance.
            </p>
          </>
        ),
      },
      {
        id: 'open',
        title: 'Open RFCs',
        content: <OpenRfcs />,
      },
    ]}
  />
)
