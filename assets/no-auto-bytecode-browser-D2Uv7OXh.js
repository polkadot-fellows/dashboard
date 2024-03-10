class I extends Error{constructor(a){super(a),this.name="AddChainError"}}class g extends Error{constructor(){super(),this.name="AlreadyDestroyedError"}}class E extends Error{constructor(){super(),this.name="JsonRpcDisabledError"}}class A extends Error{constructor(a){super(a)}}class M extends Error{constructor(){super("JSON-RPC requests queue is full")}}function y(c,a,d){return R(c,a,d),new TextDecoder().decode(c.slice(a,a+d))}function v(c,a){return R(c,a,1),c[a]}function x(c,a){return R(c,a,2),c[a]<<8|c[a+1]}function S(c,a){return R(c,a,4),(c[a]|c[a+1]<<8|c[a+2]<<16)+c[a+3]*16777216}function O(c,a,d){R(c,a,1),c[a]=d&255}function j(c,a,d){R(c,a,4),c[a+3]=d>>>24&255,c[a+2]=d>>>16&255,c[a+1]=d>>>8&255,c[a]=d&255}function R(c,a,d){if(!Number.isInteger(a)||a<0)throw new RangeError;if(a+d>c.length)throw new RangeError}var k=function(c,a,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(r){try{s(o.next(r))}catch(i){u(i)}}function e(r){try{s(o.throw(r))}catch(i){u(i)}}function s(r){r.done?n(r.value):h(r.value).then(t,e)}s((o=o.apply(c,a||[])).next())})};function P(c,a,d){return k(this,void 0,void 0,function*(){const o={instance:null,currentTask:null,bufferIndices:new Array,advanceExecutionPromise:null,onShutdownExecutorOrWasmPanic:()=>{}},h={panic:(t,e)=>{const s=o.instance;o.instance=null,t>>>=0,e>>>=0;const r=y(new Uint8Array(s.exports.memory.buffer),t,e);throw d({ty:"wasm-panic",message:r,currentTask:o.currentTask}),o.onShutdownExecutorOrWasmPanic(),o.onShutdownExecutorOrWasmPanic=()=>{},new Error},chain_initialized:(t,e,s)=>{const r=o.instance,i=new Uint8Array(r.exports.memory.buffer);if(e>>>=0,s>>>=0,e===0)d({ty:"add-chain-result",chainId:t,success:!0});else{const l=y(i,e,s);d({ty:"add-chain-result",chainId:t,success:!1,error:l})}},random_get:(t,e)=>{const s=o.instance;t>>>=0,e>>>=0;const r=new Uint8Array(s.exports.memory.buffer).subarray(t,t+e);for(let i=0;i<e;i+=65536)c.getRandomValues(r.subarray(i,i+65536))},unix_timestamp_us:()=>{const t=Math.floor(Date.now());if(t<0)throw new Error("UNIX timestamp inferior to 0");return BigInt(t)*BigInt(1e3)},monotonic_clock_us:()=>{const t=c.performanceNow(),e=Math.floor(t);return BigInt(e)*BigInt(1e3)+BigInt(Math.floor((t-e)*1e3))},buffer_size:t=>o.bufferIndices[t].byteLength,buffer_copy:(t,e)=>{const s=o.instance;e=e>>>0;const r=o.bufferIndices[t];new Uint8Array(s.exports.memory.buffer).set(r,e)},advance_execution_ready:()=>{o.advanceExecutionPromise&&o.advanceExecutionPromise(),o.advanceExecutionPromise=null},json_rpc_responses_non_empty:t=>{d({ty:"json-rpc-responses-non-empty",chainId:t})},log:(t,e,s,r,i)=>{const l=o.instance;e>>>=0,s>>>=0,r>>>=0,i>>>=0;const f=new Uint8Array(l.exports.memory.buffer);let p=y(f,e,s),m=y(f,r,i);d({ty:"log",level:t,message:m,target:p})},start_timer:t=>{const e=o.instance;t>2147483647&&(t=2147483647),t<1&&typeof setImmediate=="function"?setImmediate(()=>{if(o.instance)try{e.exports.timer_finished()}catch{}}):setTimeout(()=>{if(o.instance)try{e.exports.timer_finished()}catch{}},t)},connection_type_supported:t=>{switch(t){case 0:case 1:case 2:return c.forbidTcp?0:1;case 4:case 5:case 6:return c.forbidNonLocalWs?0:1;case 7:return c.forbidWs?0:1;case 14:return c.forbidWss?0:1;case 16:case 17:return c.forbidWebRtc?0:1;default:throw new Error("Invalid connection type passed to `connection_type_supported`")}},connection_new:(t,e,s)=>{const r=o.instance,i=new Uint8Array(r.exports.memory.buffer);e>>>=0,s>>>=0;let l;switch(v(i,e)){case 0:case 1:case 2:{const f=x(i,e+1),p=y(i,e+3,s-3);l={ty:"tcp",port:f,hostname:p};break}case 4:case 6:{const f=x(i,e+1);l={ty:"websocket",url:"ws://"+y(i,e+3,s-3)+":"+f};break}case 5:{const f=x(i,e+1);l={ty:"websocket",url:"ws://["+y(i,e+3,s-3)+"]:"+f};break}case 14:{const f=x(i,e+1);l={ty:"websocket",url:"wss://"+y(i,e+3,s-3)+":"+f};break}case 16:{const f=x(i,e+1),p=i.slice(e+3,e+35),m=y(i,e+35,s-35);l={ty:"webrtc",ipVersion:"4",remoteTlsCertificateSha256:p,targetIp:m,targetPort:f};break}case 17:{const f=x(i,e+1),p=i.slice(e+3,e+35),m=y(i,e+35,s-35);l={ty:"webrtc",ipVersion:"6",remoteTlsCertificateSha256:p,targetIp:m,targetPort:f};break}default:throw new Error("Invalid encoded address passed to `connection_new`")}d({ty:"new-connection",connectionId:t,address:l})},reset_connection:t=>{d({ty:"connection-reset",connectionId:t})},connection_stream_open:t=>{d({ty:"connection-stream-open",connectionId:t})},connection_stream_reset:(t,e)=>{d({ty:"connection-stream-reset",connectionId:t,streamId:e})},stream_send:(t,e,s,r)=>{const i=o.instance,l=new Uint8Array(i.exports.memory.buffer);s>>>=0,r>>>=0;const f=new Array;for(let p=0;p<r;++p){const m=S(l,s+8*p),w=S(l,s+8*p+4);f.push(l.slice(m,m+w))}d({ty:"stream-send",connectionId:t,streamId:e,data:f})},stream_send_close:(t,e)=>{d({ty:"stream-send-close",connectionId:t,streamId:e})},current_task_entered:(t,e)=>{t>>>=0,e>>>=0;const s=y(new Uint8Array(o.instance.exports.memory.buffer),t,e);o.currentTask=s},current_task_exit:()=>{o.currentTask=null}},n=yield WebAssembly.instantiate(a,{smoldot:h});o.instance=n,o.instance.exports.init(c.maxLogLevel);const u=new Promise(t=>o.onShutdownExecutorOrWasmPanic=()=>t("stop"));return k(this,void 0,void 0,function*(){const t=c.cpuRateLimit;let e=0,s=c.performanceNow();for(;;){const r=new Promise(m=>o.advanceExecutionPromise=()=>m("ready"));if(!o.instance)break;o.instance.exports.advance_execution();const i=c.performanceNow(),l=i-s;s=i;const f=l*(1/t-1);if(e+=f,e>5){e>2147483646&&(e=2147483646);const m=new Promise(w=>setTimeout(()=>w("timeout"),e));if((yield Promise.race([m,u]))==="stop")break}if((yield Promise.race([r,u]))==="stop")break;const p=c.performanceNow();e-=p-s,e<-1e4&&(e=-1e4),s=p}o.instance&&d({ty:"executor-shutdown"})}),{request:(t,e)=>o.instance?(o.bufferIndices[0]=new TextEncoder().encode(t),o.instance.exports.json_rpc_send(0,e)>>>0):1,peekJsonRpcResponse:t=>{if(!o.instance)return null;const e=new Uint8Array(o.instance.exports.memory.buffer),s=o.instance.exports.json_rpc_responses_peek(t)>>>0,r=S(e,s)>>>0,i=S(e,s+4)>>>0;if(i!==0){const l=y(e,r,i);return o.instance.exports.json_rpc_responses_pop(t),l}else return null},addChain:(t,e,s,r,i,l)=>{if(!o.instance){d({ty:"add-chain-id-allocated",chainId:0}),d({ty:"add-chain-result",chainId:0,success:!1,error:"Smoldot has crashed"});return}console.assert(r||i!=0,"invalid jsonRpcMaxPendingRequests value passed to local-instance::addChain"),o.bufferIndices[0]=new TextEncoder().encode(t),o.bufferIndices[1]=new TextEncoder().encode(e);const f=new Uint8Array(s.length*4);for(let m=0;m<s.length;++m)j(f,m*4,s[m]);o.bufferIndices[2]=f;const p=o.instance.exports.add_chain(0,1,r?0:i,l,2);delete o.bufferIndices[0],delete o.bufferIndices[1],delete o.bufferIndices[2],d({ty:"add-chain-id-allocated",chainId:p})},removeChain:t=>{o.instance&&o.instance.exports.remove_chain(t)},shutdownExecutor:()=>{if(!o.instance)return;const t=o.onShutdownExecutorOrWasmPanic;o.onShutdownExecutorOrWasmPanic=()=>{},t()},connectionMultiStreamSetHandshakeInfo:(t,e)=>{if(!o.instance)return;const s=new Uint8Array(1+e.localTlsCertificateSha256.length);O(s,0,0),s.set(e.localTlsCertificateSha256,1),o.bufferIndices[0]=s,o.instance.exports.connection_multi_stream_set_handshake_info(t,0),delete o.bufferIndices[0]},connectionReset:(t,e)=>{o.instance&&(o.bufferIndices[0]=new TextEncoder().encode(e),o.instance.exports.connection_reset(t,0),delete o.bufferIndices[0])},streamWritableBytes:(t,e,s)=>{o.instance&&o.instance.exports.stream_writable_bytes(t,s||0,e)},streamMessage:(t,e,s)=>{o.instance&&(o.bufferIndices[0]=e,o.instance.exports.stream_message(t,s||0,0),delete o.bufferIndices[0])},streamOpened:(t,e,s)=>{o.instance&&o.instance.exports.connection_stream_opened(t,e,s==="outbound"?1:0)},streamReset:(t,e,s)=>{o.instance&&(o.bufferIndices[0]=new TextEncoder().encode(s),o.instance.exports.stream_reset(t,e,0),delete o.bufferIndices[0])}}})}var W=function(c,a,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(r){try{s(o.next(r))}catch(i){u(i)}}function e(r){try{s(o.throw(r))}catch(i){u(i)}}function s(r){r.done?n(r.value):h(r.value).then(t,e)}s((o=o.apply(c,a||[])).next())})};function U(c){return W(this,void 0,void 0,function*(){const{port1:a,port2:d}=new MessageChannel,o=c.portToServer,h={wasmModule:yield c.wasmModule,serverToClient:d,maxLogLevel:c.maxLogLevel,cpuRateLimit:c.cpuRateLimit,forbidWs:c.forbidWs,forbidWss:c.forbidWss,forbidNonLocalWs:c.forbidNonLocalWs,forbidTcp:c.forbidTcp,forbidWebRtc:c.forbidWebRtc};o.postMessage(h,[d]);const n={jsonRpcResponses:new Map,connections:new Map};return a.onmessage=u=>{const t=u.data;switch(t.ty){case"wasm-panic":case"executor-shutdown":{a.close(),o.close();break}case"add-chain-result":{if(t.success){n.jsonRpcResponses.set(t.chainId,new Array);const e={ty:"accept-more-json-rpc-answers",chainId:t.chainId};for(let s=0;s<10;++s)a.postMessage(e)}break}case"new-connection":{n.connections.set(t.connectionId,new Set);break}case"connection-reset":{if(!n.connections.has(t.connectionId))return;n.connections.delete(t.connectionId);break}case"connection-stream-open":{if(!n.connections.has(t.connectionId))return;break}case"connection-stream-reset":{if(!n.connections.has(t.connectionId)||!n.connections.get(t.connectionId).has(t.streamId))return;break}case"stream-send":{if(!n.connections.has(t.connectionId)||t.streamId&&!n.connections.get(t.connectionId).has(t.streamId))return;break}case"stream-send-close":{if(!n.connections.has(t.connectionId)||t.streamId&&!n.connections.get(t.connectionId).has(t.streamId))return;break}case"json-rpc-response":{const e=n.jsonRpcResponses.get(t.chainId);e&&(e.push(t.response),c.eventCallback({ty:"json-rpc-responses-non-empty",chainId:t.chainId}));return}}c.eventCallback(t)},{addChain(u,t,e,s,r,i){return W(this,void 0,void 0,function*(){const l={ty:"add-chain",chainSpec:u,databaseContent:t,potentialRelayChains:e,disableJsonRpc:s,jsonRpcMaxPendingRequests:r,jsonRpcMaxSubscriptions:i};a.postMessage(l)})},removeChain(u){n.jsonRpcResponses.delete(u);const t={ty:"remove-chain",chainId:u};a.postMessage(t)},request(u,t){const e={ty:"request",chainId:t,request:u};return a.postMessage(e),0},peekJsonRpcResponse(u){const t=n.jsonRpcResponses.get(u).shift();if(!t)return null;const e={ty:"accept-more-json-rpc-answers",chainId:u};return a.postMessage(e),t},shutdownExecutor(){const u={ty:"shutdown"};a.postMessage(u)},connectionReset(u,t){n.connections.delete(u);const e={ty:"connection-reset",connectionId:u,message:t};a.postMessage(e)},connectionMultiStreamSetHandshakeInfo(u,t){const e={ty:"connection-multistream-set-info",connectionId:u,info:t};a.postMessage(e)},streamMessage(u,t,e){const s={ty:"stream-message",connectionId:u,message:t,streamId:e};a.postMessage(s)},streamOpened(u,t,e){n.connections.get(u).add(t);const s={ty:"stream-opened",connectionId:u,streamId:t,direction:e};a.postMessage(s)},streamWritableBytes(u,t,e){const s={ty:"stream-writable-bytes",connectionId:u,numExtra:t,streamId:e};a.postMessage(s)},streamReset(u,t,e){n.connections.get(u).delete(t);const s={ty:"stream-reset",connectionId:u,streamId:t,message:e};a.postMessage(s)}}})}var _=function(c,a,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(r){try{s(o.next(r))}catch(i){u(i)}}function e(r){try{s(o.throw(r))}catch(i){u(i)}}function s(r){r.done?n(r.value):h(r.value).then(t,e)}s((o=o.apply(c,a||[])).next())})};function B(c,a,d){const o=c.logCallback||((e,s,r)=>{e<=1?console.error("[%s] %s",s,r):e==2?console.warn("[%s] %s",s,r):e==3?console.info("[%s] %s",s,r):e==4?console.debug("[%s] %s",s,r):console.trace("[%s] %s",s,r)});a instanceof Promise||(a=Promise.resolve(a));let h=c.cpuRateLimit||1;isNaN(h)&&(h=1),h>1&&(h=1),h<0&&(h=0);const n={instance:{status:"not-created"},chainIds:new WeakMap,connections:new Map,addChainIdAllocations:[],addChainResults:new Map,onExecutorShutdownOrWasmPanic:()=>{},chains:new Map},u=e=>{switch(e.ty){case"wasm-panic":{console.error("Smoldot has panicked"+(e.currentTask?" while executing task `"+e.currentTask+"`":"")+`. This is a bug in smoldot. Please open an issue at https://github.com/smol-dot/smoldot/issues with the following message:
`+e.message),n.instance={status:"destroyed",error:new A(e.message)},n.connections.forEach(r=>r.reset()),n.connections.clear();for(const r of n.addChainIdAllocations)r({success:!1,error:"Smoldot has crashed"});n.addChainIdAllocations=[],n.addChainResults.forEach(r=>{r({success:!1,error:"Smoldot has crashed"})}),n.addChainResults.clear();for(const r of Array.from(n.chains.values())){for(const i of r.jsonRpcResponsesPromises)i();r.jsonRpcResponsesPromises=[]}n.chains.clear();const s=n.onExecutorShutdownOrWasmPanic;n.onExecutorShutdownOrWasmPanic=()=>{},s();break}case"executor-shutdown":{const s=n.onExecutorShutdownOrWasmPanic;n.onExecutorShutdownOrWasmPanic=()=>{},s();break}case"log":{o(e.level,e.target,e.message);break}case"add-chain-id-allocated":{const s=n.addChainIdAllocations.shift();n.addChainResults.set(e.chainId,s);break}case"add-chain-result":{n.addChainResults.get(e.chainId)(e),n.addChainResults.delete(e.chainId);break}case"json-rpc-responses-non-empty":{const s=n.chains.get(e.chainId).jsonRpcResponsesPromises;for(;s.length!==0;)s.shift()();break}case"new-connection":{const s=e.connectionId;n.connections.set(s,d.connect({address:e.address,onConnectionReset(r){if(n.instance.status!=="ready")throw new Error;n.connections.delete(s),n.instance.instance.connectionReset(s,r)},onMessage(r,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamMessage(s,r,i)},onStreamOpened(r,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamOpened(s,r,i)},onMultistreamHandshakeInfo(r){if(n.instance.status!=="ready")throw new Error;n.instance.instance.connectionMultiStreamSetHandshakeInfo(s,r)},onWritableBytes(r,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamWritableBytes(s,r,i)},onStreamReset(r,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamReset(s,r,i)}}));break}case"connection-reset":{n.connections.get(e.connectionId).reset(),n.connections.delete(e.connectionId);break}case"connection-stream-open":{n.connections.get(e.connectionId).openOutSubstream();break}case"connection-stream-reset":{n.connections.get(e.connectionId).reset(e.streamId);break}case"stream-send":{n.connections.get(e.connectionId).send(e.data,e.streamId);break}case"stream-send-close":{n.connections.get(e.connectionId).closeSend(e.streamId);break}}},t=c.portToWorker;return t?n.instance={status:"not-ready",whenReady:U({wasmModule:a.then(e=>e.wasm),forbidTcp:c.forbidTcp||!1,forbidWs:c.forbidWs||!1,forbidNonLocalWs:c.forbidNonLocalWs||!1,forbidWss:c.forbidWss||!1,forbidWebRtc:c.forbidWebRtc||!1,maxLogLevel:c.maxLogLevel||3,cpuRateLimit:h,portToServer:t,eventCallback:u}).then(e=>{n.instance.status!=="destroyed"&&(n.instance={status:"ready",instance:e})})}:n.instance={status:"not-ready",whenReady:a.then(e=>P({forbidTcp:c.forbidTcp||!1,forbidWs:c.forbidWs||!1,forbidNonLocalWs:c.forbidNonLocalWs||!1,forbidWss:c.forbidWss||!1,forbidWebRtc:c.forbidWebRtc||!1,maxLogLevel:c.maxLogLevel||3,cpuRateLimit:h,envVars:[],performanceNow:d.performanceNow,getRandomValues:d.getRandomValues},e.wasm,u)).then(e=>{n.instance.status!=="destroyed"&&(n.instance={status:"ready",instance:e})})},{addChain:e=>_(this,void 0,void 0,function*(){if(n.instance.status==="not-ready"&&(yield n.instance.whenReady),n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status==="not-created"||n.instance.status==="not-ready")throw new Error;if(typeof e.chainSpec!="string")throw new Error("Chain specification must be a string");let s=[];if(e.potentialRelayChains)for(const w of e.potentialRelayChains){const b=n.chainIds.get(w);b!==void 0&&s.push(b)}let r=e.jsonRpcMaxPendingRequests===void 0?1/0:e.jsonRpcMaxPendingRequests;if(r=Math.floor(r),r<=0||isNaN(r))throw new I("Invalid value for `jsonRpcMaxPendingRequests`");r>4294967295&&(r=4294967295);let i=e.jsonRpcMaxSubscriptions===void 0?1/0:e.jsonRpcMaxSubscriptions;if(i=Math.floor(i),i<0||isNaN(i))throw new I("Invalid value for `jsonRpcMaxSubscriptions`");if(i>4294967295&&(i=4294967295),e.databaseContent!==void 0&&typeof e.databaseContent!="string")throw new I("`databaseContent` is not a string");const l=new Promise(w=>n.addChainIdAllocations.push(w));n.instance.instance.addChain(e.chainSpec,e.databaseContent||"",s,!!e.disableJsonRpc,r,i);const f=yield l;if(!f.success)throw new I(f.error);const p=f.chainId;n.chains.set(p,{jsonRpcResponsesPromises:new Array});const m={sendJsonRpc:w=>{if(n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;if(!n.chains.has(p))throw new g;if(e.disableJsonRpc)throw new E;const b=n.instance.instance.request(w,p);switch(b){case 0:break;case 1:throw new M;default:throw new Error("Internal error: unknown json_rpc_send error code: "+b)}},nextJsonRpcResponse:()=>_(this,void 0,void 0,function*(){for(;;){if(!n.chains.has(p))throw new g;if(e.disableJsonRpc)return Promise.reject(new E);if(n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;const w=n.instance.instance.peekJsonRpcResponse(p);if(w)return w;yield new Promise(b=>{n.chains.get(p).jsonRpcResponsesPromises.push(b)})}}),remove:()=>{if(n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;if(!n.chains.has(p))throw new g;console.assert(n.chainIds.has(m)),n.chainIds.delete(m);for(const w of n.chains.get(p).jsonRpcResponsesPromises)w();n.chains.delete(p),n.instance.instance.removeChain(p)}};return n.chainIds.set(m,p),m}),terminate:()=>_(this,void 0,void 0,function*(){if(n.instance.status==="not-ready"&&(yield n.instance.whenReady),n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;n.instance.instance.shutdownExecutor(),yield new Promise(e=>n.onExecutorShutdownOrWasmPanic=e),n.instance.status==="ready"&&(n.instance={status:"destroyed",error:new g}),n.connections.forEach(e=>e.reset()),n.connections.clear();for(const e of n.addChainIdAllocations)e({success:!1,error:"Client.terminate() has been called"});n.addChainIdAllocations=[],n.addChainResults.forEach(e=>{e({success:!1,error:"Client.terminate() has been called"})}),n.addChainResults.clear();for(const e of Array.from(n.chains.values())){for(const s of e.jsonRpcResponsesPromises)s();e.jsonRpcResponsesPromises=[]}n.chains.clear()})}}var C=function(c,a,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(r){try{s(o.next(r))}catch(i){u(i)}}function e(r){try{s(o.throw(r))}catch(i){u(i)}}function s(r){r.done?n(r.value):h(r.value).then(t,e)}s((o=o.apply(c,a||[])).next())})};function N(c){if(c.forbidTcp=!0,typeof isSecureContext=="boolean"&&isSecureContext&&typeof location!==void 0){const a=location.toString();a.indexOf("localhost")!==-1&&a.indexOf("127.0.0.1")!==-1&&a.indexOf("::1")!==-1&&(c.forbidNonLocalWs=!0)}return B(c,c.bytecode,{performanceNow:()=>performance.now(),getRandomValues:a=>{const d=globalThis.crypto;if(!d)throw new Error("randomness not available");if(a.buffer instanceof ArrayBuffer)d.getRandomValues(a);else{const o=new Uint8Array(a.length);d.getRandomValues(o),a.set(o)}},connect:a=>L(a)})}function L(c){if(c.address.ty==="websocket"){let a;try{a=new WebSocket(c.address.url)}catch(h){a=h instanceof Error?h.toString():"Exception thrown by new WebSocket"}const d={quenedUnreportedBytes:0,nextTimeout:10},o=()=>{if(!(a instanceof WebSocket)||a.readyState!=1)return;const h=a.bufferedAmount;let n=d.quenedUnreportedBytes-h;n<0&&(n=0),d.quenedUnreportedBytes-=n,d.quenedUnreportedBytes!=0&&(setTimeout(o,d.nextTimeout),d.nextTimeout*=2,d.nextTimeout>500&&(d.nextTimeout=500)),n!=0&&c.onWritableBytes(n)};return a instanceof WebSocket?(a.binaryType="arraybuffer",a.onopen=()=>{c.onWritableBytes(1024*1024)},a.onclose=h=>{const n="Error code "+h.code+(h.reason?": "+h.reason:"");c.onConnectionReset(n)},a.onmessage=h=>{c.onMessage(new Uint8Array(h.data))}):setTimeout(()=>{a&&!(a instanceof WebSocket)&&(c.onConnectionReset(a),a=null)},1),{reset:()=>{a instanceof WebSocket&&(a.onopen=null,a.onclose=null,a.onmessage=null,a.onerror=null,a.readyState==WebSocket.OPEN&&a.close()),a=null},send:h=>{d.quenedUnreportedBytes==0&&(d.nextTimeout=10,setTimeout(o,10));for(const n of h)d.quenedUnreportedBytes+=n.length;a.send(new Blob(h))},closeSend:()=>{throw new Error("Wrong connection type")},openOutSubstream:()=>{throw new Error("Wrong connection type")}}}else if(c.address.ty==="webrtc"){const{targetPort:a,ipVersion:d,targetIp:o,remoteTlsCertificateSha256:h}=c.address,n={pc:void 0,dataChannels:new Map,nextStreamId:0,isFirstOutSubstream:!0},u=()=>{if(!n.pc){console.assert(n.dataChannels.size===0,"substreams exist while pc is undef"),n.pc=null;return}n.pc.onconnectionstatechange=null,n.pc.onnegotiationneeded=null,n.pc.ondatachannel=null;for(const e of Array.from(n.dataChannels.values()))e.channel.onopen=null,e.channel.onerror=null,e.channel.onclose=null,e.channel.onbufferedamountlow=null,e.channel.onmessage=null;n.dataChannels.clear(),n.pc.close()},t=(e,s)=>{const r=n.nextStreamId;n.nextStreamId+=1,e.binaryType="arraybuffer";let i={value:!1};e.onopen=()=>{console.assert(!i.value,"substream opened twice"),i.value=!0,c.onStreamOpened(r,s),c.onWritableBytes(65536,r)},e.onerror=e.onclose=l=>{const f=l instanceof RTCErrorEvent?l.error.toString():"RTCDataChannel closed";i.value?(e.onopen=null,e.onerror=null,e.onclose=null,e.onbufferedamountlow=null,e.onmessage=null,n.dataChannels.delete(r),c.onStreamReset(r,f)):(u(),c.onConnectionReset("data channel failed to open: "+f))},e.onbufferedamountlow=()=>{const l=n.dataChannels.get(r),f=l.bufferedBytes;l.bufferedBytes=0,c.onWritableBytes(f,r)},e.onmessage=l=>{c.onMessage(new Uint8Array(l.data),r)},n.dataChannels.set(r,{channel:e,bufferedBytes:0})};return RTCPeerConnection.generateCertificate({name:"ECDSA",namedCurve:"P-256",hash:"SHA-256"}).then(e=>C(this,void 0,void 0,function*(){if(n.pc===null)return;if((o=="localhost"||o=="127.0.0.1"||o=="::1")&&navigator.userAgent.indexOf("Firefox")!==-1){u(),c.onConnectionReset("Firefox can't connect to a localhost WebRTC server");return}n.pc=new RTCPeerConnection({certificates:[e]});let s;if(e.getFingerprints){for(const{algorithm:i,value:l}of e.getFingerprints())if(i==="sha-256"){s=l;break}}else{const l=(yield n.pc.createOffer()).sdp.match(/a(\s*)=(\s*)fingerprint:(\s*)(sha|SHA)-256(\s*)(([a-fA-F0-9]{2}(:)*){32})/);l&&(s=l[6])}if(s===void 0){c.onConnectionReset("Failed to obtain the browser certificate fingerprint");return}let r=new Uint8Array(32);r.set(s.split(":").map(i=>parseInt(i,16)),0),n.pc.onconnectionstatechange=i=>{(n.pc.connectionState=="closed"||n.pc.connectionState=="disconnected"||n.pc.connectionState=="failed")&&(u(),c.onConnectionReset("WebRTC state transitioned to "+n.pc.connectionState))},n.pc.onnegotiationneeded=i=>C(this,void 0,void 0,function*(){var l;let f=(yield n.pc.createOffer()).sdp;f.match(/^m=application(\s+)(\d+)(\s+)UDP\/DTLS\/SCTP(\s+)webrtc-datachannel$/m)===null&&console.error("Local offer doesn't contain UDP data channel. WebRTC connections will likely fail. Please report this issue.");const p=(l=f.match(/^a=ice-pwd:(.+)$/m))===null||l===void 0?void 0:l.at(1);p===void 0&&console.error("Failed to set ufrag to pwd. WebRTC connections will likely fail. Please report this issue.");const m="libp2p+webrtc+v1/"+p;f=f.replace(/^a=ice-ufrag.*$/m,"a=ice-ufrag:"+m),f=f.replace(/^a=ice-pwd.*$/m,"a=ice-pwd:"+m),yield n.pc.setLocalDescription({type:"offer",sdp:f});const w=Array.from(h).map(T=>("0"+T.toString(16)).slice(-2).toUpperCase()).join(":"),b=`v=0
o=- 0 0 IN IP`+d+" "+o+`
s=-
t=0 0
a=ice-lite
m=application `+String(a)+` UDP/DTLS/SCTP webrtc-datachannel
c=IN IP`+d+" "+o+`
a=mid:0
a=ice-options:ice2
a=ice-ufrag:`+m+`
a=ice-pwd:`+m+`
a=fingerprint:sha-256 `+w+`
a=setup:passive
a=sctp-port:5000
a=max-message-size:16384
a=candidate:1 1 UDP 1 `+o+" "+String(a)+` typ host
`;yield n.pc.setRemoteDescription({type:"answer",sdp:b})}),n.pc.ondatachannel=({channel:i})=>{t(i,"inbound")},c.onMultistreamHandshakeInfo({handshake:"webrtc",localTlsCertificateSha256:r})})),{reset:e=>{if(e===void 0)u();else{const s=n.dataChannels.get(e);s.channel.onopen=null,s.channel.onerror=null,s.channel.onclose=null,s.channel.onbufferedamountlow=null,s.channel.onmessage=null,s.channel.close(),n.dataChannels.delete(e)}},send:(e,s)=>{const r=n.dataChannels.get(s);for(const i of e)r.bufferedBytes+=i.length;r.channel.send(new Blob(e))},closeSend:()=>{throw new Error("Wrong connection type")},openOutSubstream:()=>{const e=n.isFirstOutSubstream?{negotiated:!0,id:0}:{};n.isFirstOutSubstream=!1,t(n.pc.createDataChannel("",e),"outbound")}}}else throw new Error}export{I as AddChainError,g as AlreadyDestroyedError,A as CrashError,E as JsonRpcDisabledError,M as QueueFullError,N as startWithBytecode};
