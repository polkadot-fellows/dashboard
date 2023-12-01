// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyJson } from "types"

export const useFillVariables = () => {
  const fillVariables = (d: AnyJson, keys: string[]) => {
    const fields: AnyJson = Object.entries(d).filter(([k]: any) =>
      keys.includes(k)
    )

    const transformed = Object.entries(fields).map(
      ([, [key, val]]: AnyJson) => {
        const varsToValues = [["{SOME_KEY}", "some_vlue"]]

        for (const varToVal of varsToValues) {
          if (val?.constructor === Array) {
            val =
              val?.map((_d) => _d.replaceAll(varToVal[0], varToVal[1])) || ""
          } else {
            val = val?.replaceAll(varToVal[0], varToVal[1]) || ""
          }
        }
        return [key, val]
      }
    )

    return {
      ...d,
      ...Object.fromEntries(transformed),
    }
  }

  return {
    fillVariables,
  }
}
