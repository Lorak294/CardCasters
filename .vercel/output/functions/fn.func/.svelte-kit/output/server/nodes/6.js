import * as server from '../entries/pages/profile/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/profile/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.284c5a59.js","_app/immutable/chunks/scheduler.9428e398.js","_app/immutable/chunks/index.b8fe6288.js","_app/immutable/chunks/forms.d95c3e1b.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.6d077386.js","_app/immutable/chunks/navigation.61229cf3.js"];
export const stylesheets = ["_app/immutable/assets/6.4aee4bd3.css"];
export const fonts = [];
