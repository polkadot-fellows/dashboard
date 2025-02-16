import { reusableH1 } from '@/consts'

export const OpenDevMonthlyCalls = () => {
  return (
    <>
      <h1 className={reusableH1 + ' py-2'}>Monthly calls</h1>
      <p>
        The Polkadot Fellowship runs a call (“OpenDev”) on a monthly basis to
        share current and future developments of the Polkadot roadmap.
      </p>
      <h2 className="my-4 flex-1 shrink-0 whitespace-nowrap font-unbounded text-lg font-semibold tracking-tight text-primary sm:grow-0">
        Agenda
      </h2>
      <p>
        All new and existing members are invited to join this live call to
        introduce themselves, present their contributions to the codebase,
        participate in discussions about RFCs, propose ideas for the growth of
        the Fellowship, and answer questions from the general public.
      </p>
      <h2 className="my-4 flex-1 shrink-0 whitespace-nowrap font-unbounded text-lg font-semibold tracking-tight text-primary sm:grow-0">
        Upcoming calls
      </h2>

      <iframe width="800"
              height="600"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&showPrint=0&src=N2FiNDZiY2RhNmQyM2U3YjQxMzA2MjUxZDQ1M2UzMTQ3MWE5YTNjYmVkYWIzNWRhNjliZWU3MzBkNmU2MGE5M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E67C73"
              title="Fellowship live calendar" >
      </iframe>
    </>
  )
}
