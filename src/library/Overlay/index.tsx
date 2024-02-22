// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ModalOverlay } from "@polkadot-ui/react"
import { useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useHelp } from "contexts/Help"

export const Overlay = () => {
  const controls = useAnimation()
  const { status: helpStatus } = useHelp()

  const onFadeIn = async () => {
    await controls.start("visible")
  }
  const onFadeOut = async () => {
    await controls.start("hidden")
  }

  // Managing fade is more complex with help, as it can overlay modal and canvas. Do not fade in/out
  // if modal or canvas is open. (help can be opened in a modal, canvas can be summoned in an open
  // modal).
  useEffect(() => {
    if (helpStatus === 1) onFadeIn()
    if (helpStatus === 2) onFadeOut()
  }, [helpStatus])

  if (helpStatus === 0) {
    return <></>
  }

  return (
    <ModalOverlay
      blur={helpStatus === 1 ? "14px" : "4px"}
      initial={{
        opacity: 0,
      }}
      animate={controls}
      transition={{
        duration: 0.15,
      }}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
    />
  )
}
