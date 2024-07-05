import type { InjectedExtension } from "polkadot-api/pjs-signer"
import { connectInjectedExtension } from "polkadot-api/pjs-signer"
import type { PropsWithChildren } from "react"
import { useSyncExternalStore } from "react"
import { extensionCtx, useAvailableExtensions } from "./extensionCtx"

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
  const onToggleExtension = (name: string) => {
    if (isRunning) return

    if (connectedExtensions.has(name)) {
      connectedExtensions.delete(name)
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

export const ExtensionProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const availableExtensions = useAvailableExtensions()
  const selectedExtensions = useSyncExternalStore(
    extensionsStore.subscribe,
    extensionsStore.getSnapshot
  )

  if (availableExtensions.length === 0)
    return <div>No extension provider detected</div>

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {availableExtensions.map((extensionName) => (
        <button
          style={{
            fontStyle: selectedExtensions.has(extensionName) ? "italic" : "",
          }}
          onClick={() => {
            extensionsStore.onToggleExtension(extensionName)
          }}
          key={extensionName}
        >
          {extensionName}
        </button>
      ))}
      <extensionCtx.Provider value={[...selectedExtensions.values()]}>
        {selectedExtensions.size ? children : null}
      </extensionCtx.Provider>
    </div>
  )
}
