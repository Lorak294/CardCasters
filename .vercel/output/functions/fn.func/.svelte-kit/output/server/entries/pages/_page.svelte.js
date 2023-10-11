import { c as create_ssr_component, d as escape } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${data.session ? `<h1>Welcome ${escape(data.session.user.email)}!</h1> <form action="/api/logout" method="post" data-svelte-h="svelte-1bqjpls"><button type="submit">Logout</button></form>` : `<div data-svelte-h="svelte-nfa9j5">Annonymous Home page</div>`}`;
});
export {
  Page as default
};
