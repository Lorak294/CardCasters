import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.f9547d8e.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.9428e398.js","_app/immutable/chunks/index.b8fe6288.js","_app/immutable/chunks/navigation.61229cf3.js","_app/immutable/chunks/singletons.6d077386.js"];
export const stylesheets = ["_app/immutable/assets/0.c58f4582.css"];
export const fonts = [];
