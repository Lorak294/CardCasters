import * as server from '../entries/pages/auth/register/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.9792e9d2.js","_app/immutable/chunks/scheduler.9428e398.js","_app/immutable/chunks/index.b8fe6288.js","_app/immutable/chunks/forms.d95c3e1b.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.6d077386.js","_app/immutable/chunks/navigation.61229cf3.js"];
export const stylesheets = ["_app/immutable/assets/4.bc4c3247.css"];
export const fonts = [];
