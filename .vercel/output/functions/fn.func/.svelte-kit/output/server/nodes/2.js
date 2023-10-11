

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.baac610a.js","_app/immutable/chunks/scheduler.9428e398.js","_app/immutable/chunks/index.b8fe6288.js"];
export const stylesheets = [];
export const fonts = [];
