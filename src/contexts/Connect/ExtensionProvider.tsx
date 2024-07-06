import type { InjectedExtension } from "polkadot-api/pjs-signer"
import { connectInjectedExtension } from "polkadot-api/pjs-signer"
import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { useSyncExternalStore } from "react"
import { extensionCtx } from "./extensionCtx"
import { getExtensionIcon } from "@polkadot-ui/assets/extensions"
import { useAvailableExtensions } from "./hooks"
import type { SelectedAccountType } from "./types"

const { Provider } = extensionCtx

const getExtensionsStore = () => {
  let connectedExtensions = new Map<string, InjectedExtension>()
  const getSnapshot = () => connectedExtensions

  const listeners = new Set<() => void>()
  const update = () => {
    connectedExtensions = new Map(connectedExtensions)
    listeners.forEach((cb) => {
      cb()
    })
  }
  const subscribe = (cb: () => void) => {
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  }

  let isRunning = false
  const onToggleExtension = (
    name: string,
    setSelected: Dispatch<SetStateAction<SelectedAccountType>>
  ) => {
    if (isRunning) return

    if (connectedExtensions.has(name)) {
      connectedExtensions.delete(name)
      setSelected(null)
      return update()
    }

    isRunning = true
    connectInjectedExtension(name)
      .then(
        (extension) => {
          connectedExtensions.set(name, extension)
          update()
        },
        () => {}
      )
      .finally(() => {
        isRunning = false
      })
  }

  return {
    subscribe,
    getSnapshot,
    onToggleExtension,
  }
}

const extensionsStore = getExtensionsStore()
extensionsStore.subscribe(Function.prototype as any)

export const ExtensionProvider: React.FC<
  PropsWithChildren<{
    setSelected: Dispatch<SetStateAction<SelectedAccountType>>
  }>
> = ({ children, setSelected }) => {
  const availXts = useAvailableExtensions()
  const selXts = useSyncExternalStore(
    extensionsStore.subscribe,
    extensionsStore.getSnapshot
  )

  if (availXts.length === 0) return <div>No extension detected</div>

  return (
    <>
      <h4>Extensions</h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {availXts.map((xtName) => {
          const ExtensionIcon = getExtensionIcon(xtName)
          return (
            <div key={xtName} style={{ flex: "1 1 10rem" }}>
              <button
                style={{
                  padding: "2rem",
                  width: "15rem",
                  height: "10rem",
                  border: "0.1rem solid #8A8A8A",
                  borderRadius: "0.5rem",
                  background: selXts.has(xtName) ? "#CACACA" : "",
                }}
                onClick={() => {
                  extensionsStore.onToggleExtension(xtName, setSelected)
                }}
                key={xtName}
              >
                {ExtensionIcon && <ExtensionIcon />}
                {xtName === "subwallet-js"
                  ? "Subwallet"
                  : xtName.charAt(0).toUpperCase() + xtName.slice(1)}
              </button>
            </div>
          )
        })}
      </div>
      <Provider value={[...selXts.values()]}>
        {selXts.size ? children : null}
      </Provider>
    </>
  )
}
