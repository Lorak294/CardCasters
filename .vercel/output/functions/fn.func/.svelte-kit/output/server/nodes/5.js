import * as server from '../entries/pages/auth/register/confirm/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/register/confirm/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/register/confirm/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.cbca065d.js","_app/immutable/chunks/scheduler.9428e398.js","_app/immutable/chunks/index.b8fe6288.js"];
export const stylesheets = [];
export const fonts = [];
