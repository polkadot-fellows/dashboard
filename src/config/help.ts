// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { HelpItems } from "contexts/Help/types"

export const HelpConfig: HelpItems = [
  {
    key: "overview",
    // definitions: ["Help Key"],
    external: [
      [
        "gov",
        "https://medium.com/polkadot-network/gov2-polkadots-next-generation-of-decentralised-governance-4d9ef657d11b",
        "medium.com/polkadot-network/gov2-polkadots-next-generation-of-decentralised-governance",
      ],
      [
        "democracy",
        "https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/democracy/README.md",
        "polkadot-sdk/substrate/frame/democracy/",
      ],
      [
        "introWiki",
        "https://wiki.polkadot.network/docs/learn-polkadot-fellows",
        "wiki.polkadot.network",
      ],
    ],
    alternative: [
      [
        "polkassembly",
        "https://collectives.polkassembly.io",
        "collectives.polkassembly.io",
      ],
      [
        "subsquare",
        "https://collectives.subsquare.io/fellowship",
        "collectives.subsquare.io/fellowship",
      ],
    ],
  },
]
