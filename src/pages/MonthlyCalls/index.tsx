import { FileText, Play } from 'lucide-react'
import { DocPage } from '@/components/page'

// [date, recording, meeting minutes]
const pastCalls: [string, string, string?][] = [
  [
    '18 February 2025',
    'https://www.youtube.com/watch?v=BOGMg6ML-rQ',
    'https://forum.polkadot.network/t/2025-02-18-technical-fellowship-opendev-call/12146',
  ],
  [
    '21 January 2025',
    'https://www.youtube.com/watch?v=xyHeXI_5SX8',
    'https://forum.polkadot.network/t/2025-01-21-technical-fellowship-opendev-call/11653',
  ],
  [
    '17 December 2024',
    'https://www.youtube.com/watch?v=9MVEPhvMV1Y',
    'https://forum.polkadot.network/t/2024-12-17-technical-fellowship-opendev-call/11649',
  ],
  [
    '18 November 2024',
    'https://www.youtube.com/watch?v=YldX4hfcW04',
    'https://forum.polkadot.network/t/2024-11-18-technical-fellowship-opendev-call/11109',
  ],
  [
    '15 October 2024',
    'https://www.youtube.com/watch?v=F2wYK-N321Q',
    'https://forum.polkadot.network/t/2024-10-15-technical-fellowship-opendev-call/10812',
  ],
  [
    '17 September 2024',
    'https://www.youtube.com/watch?v=oWppBMrgU7M',
    'https://forum.polkadot.network/t/2024-09-17-technical-fellowship-opendev-call/10457',
  ],
  [
    '16 July 2024',
    'https://www.youtube.com/live/oWppBMrgU7M?si=ez-_hUW9et0n6efR',
    'https://forum.polkadot.network/t/2024-07-16-technical-fellowship-opendev-call/9512',
  ],
  [
    '25 June 2024',
    'https://www.youtube.com/watch?v=MU7tCyhBU7g',
    'https://forum.polkadot.network/t/2024-06-25-technical-fellowship-opendev-call/8890',
  ],
  [
    '21 May 2024',
    'https://www.youtube.com/watch?v=War1weBu7yU',
    'https://forum.polkadot.network/t/2024-05-21-technical-fellowship-opendev-call/8264',
  ],
  [
    '23 April 2024',
    'https://www.youtube.com/watch?v=n6U-UbX546E',
    'https://forum.polkadot.network/t/2024-04-23-technical-fellowship-opendev-call/7592',
  ],
  [
    '19 March 2024',
    'https://www.youtube.com/watch?v=zSKiAE7fBPI&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=1&pp=iAQB',
    'https://forum.polkadot.network/t/2024-03-19-technical-fellowship-opendev-call/6901',
  ],
  [
    '20 February 2024',
    'https://www.youtube.com/watch?v=bqLujRSs6iY&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=2&pp=iAQB',
    'https://forum.polkadot.network/t/technical-fellowship-opendev-call-2024-02-20/6355',
  ],
  [
    '16 January 2024',
    'https://www.youtube.com/watch?v=itUw-ndb-Tc&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=3&pp=iAQB',
  ],
]

const pill =
  'not-prose hover:bg-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors'

export const MonthlyCalls = () => (
  <DocPage
    title="Monthly calls"
    lead="The Polkadot Fellowship runs a call (“OpenDev”) on a monthly basis to share current and future developments of the Polkadot roadmap."
    sections={[
      {
        id: 'agenda',
        title: 'Agenda',
        content: (
          <p>
            All new and existing members are invited to join this live call to
            introduce themselves, present their contributions to the codebase,
            participate in discussions about RFCs, propose ideas for the growth
            of the Fellowship, and answer questions from the general public.
          </p>
        ),
      },
      {
        id: 'upcoming',
        title: 'Upcoming calls',
        content: (
          <div className="overflow-hidden rounded-lg border bg-white">
            <iframe
              className="aspect-[4/3] w-full"
              loading="lazy"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&showPrint=0&src=N2FiNDZiY2RhNmQyM2U3YjQxMzA2MjUxZDQ1M2UzMTQ3MWE5YTNjYmVkYWIzNWRhNjliZWU3MzBkNmU2MGE5M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E67C73"
              title="Fellowship live calendar"
            />
          </div>
        ),
      },
      {
        id: 'recordings',
        title: 'Recordings',
        content: (
          <ul className="not-prose !list-none divide-y rounded-lg border !p-0">
            {pastCalls.map(([date, recording, minutes]) => (
              <li
                key={date}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <span className="text-sm font-medium">{date}</span>
                <span className="flex gap-2">
                  <a
                    className={pill}
                    href={recording}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Recording
                  </a>
                  {minutes && (
                    <a
                      className={pill}
                      href={minutes}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Minutes
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ),
      },
    ]}
  />
)
