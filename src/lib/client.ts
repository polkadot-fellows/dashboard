import { dot } from "@polkadot-api/descriptors";
import { createClient } from "polkadot-api";
import { WebSocketProvider } from "polkadot-api/ws-provider/web";

const ws = WebSocketProvider("wss://polkadot-rpc.dwellir.com");

// Connect to the polkadot relay chain.
export const client = createClient(ws);

// To interact with the chain, you need to get the `TypedApi`, which includes
// all the types for every call in that chain:
export const dotApi = client.getTypedApi(dot);

// // With the `client`, you can get information such as subscribing to the last
// // block to get the latest hash:
// client.finalizedBlock$.subscribe((finalizedBlock) =>
//   console.log(finalizedBlock.number, finalizedBlock.hash)
// );
