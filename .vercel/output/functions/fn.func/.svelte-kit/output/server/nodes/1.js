

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ffdeaef4.js","_app/immutable/chunks/scheduler.9428e398.js","_app/immutable/chunks/index.b8fe6288.js","_app/immutable/chunks/singletons.6d077386.js"];
export const stylesheets = [];
export const fonts = [];
