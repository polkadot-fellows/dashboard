// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useTranslation } from "react-i18next"
import { Summary, Wrapper } from "./Wrappers"

export const NetworkBar = () => {
  const { t } = useTranslation("library")

  const PRIVACY_URL = import.meta.env.VITE_PRIVACY_URL
  const DISCLAIMER_URL = import.meta.env.VITE_DISCLAIMER_URL
  const ORGANISATION = import.meta.env.VITE_ORGANISATION
  const LEGAL_DISCLOSURES_URL = import.meta.env.VITE_LEGAL_DISCLOSURES_URL

  return (
    <Wrapper>
      {/* <network.brand.icon className="network_icon" /> */}
      <Summary>
        <section>
          {PRIVACY_URL !== undefined ? (
            <p>
              <a href={PRIVACY_URL} target="_blank" rel="noreferrer">
                {/* {t("privacy")} */}
              </a>
            </p>
          ) : null}
          {DISCLAIMER_URL !== undefined && (
            <>
              <p>
                <a href={DISCLAIMER_URL} target="_blank" rel="noreferrer">
                  {/* {t("disclaimer")} */}
                </a>
              </p>
            </>
          )}
          {LEGAL_DISCLOSURES_URL !== undefined && (
            <>
              <p>
                <a
                  href={LEGAL_DISCLOSURES_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("legalDisclosures")}
                </a>
              </p>
            </>
          )}
        </section>
        <section>
          <div className="hide-small">
            <p>
              {ORGANISATION === undefined
                ? "Polkadot Fellowship"
                : ORGANISATION}
              {" - "}
              {new Date().getFullYear()}
            </p>
          </div>
        </section>
      </Summary>
    </Wrapper>
  )
}
