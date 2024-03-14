// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import styled from "styled-components"

export interface MinimisedProps {
  $minimised?: boolean
}

export const LogoWrapper = styled.button<MinimisedProps>`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${(props) => (props.$minimised ? "center" : "flex-start")};
  width: 100%;
  padding: ${(props) => (props.$minimised ? "1rem" : "0.4rem 0.5rem")};
  position: relative;

  ellipse {
    fill: var(--network-color-primary);
  }
`
