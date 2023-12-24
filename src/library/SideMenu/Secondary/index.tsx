// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { SecondaryProps } from "../types"
import { IconWrapper, MinimisedWrapper, Wrapper } from "./Wrappers"

export const Secondary = ({
  action,
  classes,
  name,
  icon,
  minimised,
  onClick,
}: SecondaryProps) => {
  const size = minimised ? "1.5rem" : "1.25rem"

  const StyledWrapper = minimised ? MinimisedWrapper : Wrapper

  return (
    <StyledWrapper
      className={classes ? classes.join(" ") : undefined}
      onClick={() => {
        onClick()
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.1,
      }}
    >
      <IconWrapper
        $minimised={minimised}
        className="icon"
        style={{ width: size, height: size }}
      >
        {icon && icon({ size, fill: "var(--accent-color-primary)" })}
      </IconWrapper>

      {!minimised && (
        <>
          <div className="name">{name}</div>
          {action && <div className="action">{action}</div>}
        </>
      )}
    </StyledWrapper>
  )
}
