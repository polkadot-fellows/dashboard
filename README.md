# Polkadot Technical Fellowship Dashboard

The website of the Polkadot Technical Fellowship: its members, how it works
and where to find everything around it. Live at https://polkadot-fellows.xyz.

## How it works

- **React + Vite + Tailwind CSS**, with a handful of Radix primitives
  (`src/components/ui`).
- **On-chain data comes from a light client.** [polkadot-api](https://papi.how)
  runs smoldot in a web worker and syncs Polkadot, Collectives and People in
  the browser, so there is no centralized RPC in between. The light client
  lives in `src/lightClient.ts` and is loaded with a dynamic import from
  `src/clients.ts` to keep it out of the main chunk.
- **Wallets** are connected through `polkadot-api/pjs-signer`
  (`src/contexts/AccountContextProvider.tsx`).
- The documentation-like pages (`src/pages/*`) are plain JSX rendered by
  `DocPage` (`src/components/page.tsx`).

## Development

Requires Node 22 and pnpm.

```sh
pnpm install   # also generates the polkadot-api descriptors
pnpm dev       # start the dev server
pnpm lint      # prettier + eslint
pnpm build     # type-check and build into ./build
pnpm preview   # serve the production build locally
```

After a runtime upgrade, refresh the chain metadata with `pnpm papi update`.
