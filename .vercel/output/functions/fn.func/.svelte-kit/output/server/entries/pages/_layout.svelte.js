import { c as create_ssr_component, b as spread, e as escape_object, d as escape, v as validate_component } from "../../chunks/ssr.js";
const app = "";
const Account = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "nav.svelte-x6y3su{background-color:var(--secondary1);color:var(--main1);display:flex;justify-content:space-around;padding:10px;z-index:100;align-items:center;box-shadow:var(--shadow)}a.svelte-x6y3su{color:var(--main1);text-decoration:none;&:hover {\r\n			transform: scale(1.1);\r\n			color: var(--active);\r\n			text-shadow: var(--shadowlight);\r\n			transition: 0.2s;\r\n		}}.logged-user.svelte-x6y3su{display:flex;align-items:center;gap:0.5em}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<nav class="svelte-x6y3su"><a href="/" class="logo svelte-x6y3su" data-svelte-h="svelte-11fjfcn"><h1>Slanga</h1></a> ${data.session?.user ? ` <a href="/definitions" class="svelte-x6y3su" data-svelte-h="svelte-cvpjrn">Definitions</a> <a href="/" class="svelte-x6y3su" data-svelte-h="svelte-5a0zws">Home</a> <a href="/about" class="svelte-x6y3su" data-svelte-h="svelte-iphxk9">About</a> <a class="logged-user svelte-x6y3su" href="/profile"><p>${escape(data.session.user.user_metadata.username)}</p> ${validate_component(Account, "IconUser").$$render($$result, { style: "font-size: 2em" }, {}, {})}</a>` : ` <a href="/auth/login" class="svelte-x6y3su" data-svelte-h="svelte-ku6vg1">Sign in</a> <a href="/auth/register" class="svelte-x6y3su" data-svelte-h="svelte-z6e0kc">Register</a>`}</nav> ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
