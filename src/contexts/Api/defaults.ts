// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { APIChainState, APIContextInterface } from "./types"

// import { stringToU8a } from "@polkadot/util"
// import BigNumber from "bignumber.js"

// export const defaultConsts: APIConstants = {
//   bondDuration: new BigNumber(0),
//   maxNominations: new BigNumber(0),
//   sessionsPerEra: new BigNumber(0),
//   maxExposurePageSize: new BigNumber(0),
//   historyDepth: new BigNumber(0),
//   maxElectingVoters: new BigNumber(0),
//   expectedBlockTime: new BigNumber(0),
//   epochDuration: new BigNumber(0),
//   existentialDeposit: new BigNumber(0),
//   fastUnstakeDeposit: new BigNumber(0),
//   poolsPalletId: stringToU8a("0"),
// }

export const defaultChainState: APIChainState = {
  chain: null,
  version: {
    specVersion: 0,
  },
  ss58Prefix: 0,
}

export const defaultApiContext: APIContextInterface = {
  api: null,
  isReady: false,
  apiStatus: "disconnected",
  // rpcEndpoint: "",
  // setRpcEndpoint: (key) => {},
  // consts: defaultConsts,
  // chainState: defaultChainState,
  // isLightClient: false,
  // setIsLightClient: () => {},
}
