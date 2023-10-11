import { c as create_ssr_component, h as add_attribute, d as escape } from "../../../../chunks/ssr.js";
import "devalue";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error.svelte-ay6lwu.svelte-ay6lwu{color:var(--cancel);text-shadow:var(--shadow);display:flex;justify-content:center;margin-top:10px}.container.svelte-ay6lwu.svelte-ay6lwu{width:100%;height:100vh;display:flex;justify-content:center;padding:10vh;background-image:url('/mesh.png');background-repeat:no-repeat;background-size:cover;background-position:center}.widget.svelte-ay6lwu.svelte-ay6lwu{width:30%;padding:5vh;min-width:400px}.link.svelte-ay6lwu.svelte-ay6lwu{width:100%;padding-top:4vh;display:flex;justify-self:center;justify-content:center;gap:1rem}.widget.svelte-ay6lwu a.svelte-ay6lwu{text-decoration:none;color:var(--active);font-weight:bold;&:hover {\r\n			transform: scale(1.1);\r\n			color: var(--secondary1);\r\n			text-shadow: var(--shadowlight);\r\n			transition: 0.2s;\r\n		}}.title.svelte-ay6lwu.svelte-ay6lwu{margin-bottom:5vh;font-size:6vh;color:var(--main1);text-shadow:var(--shadow)}form.svelte-ay6lwu input.svelte-ay6lwu{margin-bottom:25px;font-size:larger;border-radius:10px;padding:10px;border:1px solid #ccc;box-shadow:var(--shadow);display:inline-block;box-sizing:border-box;width:100%;margin-top:5px}form.svelte-ay6lwu button.svelte-ay6lwu{margin-top:5px;padding:20px;width:100%;border-radius:12px;border:none;box-shadow:var(--shadow);background-color:var(--secondary1);color:var(--main1);font-size:x-large;font-weight:600;&:hover {\r\n			transform: scale(1.03);\r\n			transition: 0.2s;\r\n		}}form.svelte-ay6lwu label.svelte-ay6lwu{text-shadow:var(--shadow)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  return `  <div class="container svelte-ay6lwu"><div class="widget svelte-ay6lwu"><form action="?/login" method="post" class="svelte-ay6lwu"><h1 class="title svelte-ay6lwu" data-svelte-h="svelte-1bzrg77">Sign in</h1> <label for="email" class="svelte-ay6lwu" data-svelte-h="svelte-1p9d3fm">Email</label> <input type="email" name="email" id="email"${add_attribute("value", form?.data?.email ?? "", 0)} class="svelte-ay6lwu"><br> <label for="password" class="svelte-ay6lwu" data-svelte-h="svelte-pepa0a">Password</label> <input type="password" name="password" id="password" class="svelte-ay6lwu"><br> <button type="submit" class="svelte-ay6lwu" data-svelte-h="svelte-13remx3">Sign in</button> ${form?.messeage ? `<div class="error svelte-ay6lwu"><p>${escape(form?.messeage)}</p></div>` : ``}</form> <div class="link svelte-ay6lwu" data-svelte-h="svelte-1s7flgi"><p>First time here?</p> <a href="/auth/register" class="svelte-ay6lwu">Create an account</a></div></div> </div>`;
});
export {
  Page as default
};
