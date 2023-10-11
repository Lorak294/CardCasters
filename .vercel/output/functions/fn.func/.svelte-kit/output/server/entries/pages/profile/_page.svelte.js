import { c as create_ssr_component, i as createEventDispatcher, h as add_attribute, d as escape, v as validate_component } from "../../../chunks/ssr.js";
import "devalue";
const Avatar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".center.svelte-bzj09f{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1em}.avatar.svelte-bzj09f{width:300px;height:300px}.image.svelte-bzj09f{background-color:rgb(0, 160, 107)}.no-image.svelte-bzj09f{background-color:rgb(133, 70, 11);text-align:center}",
  map: null
};
const Avatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { supabase } = $$props;
  let avatarUrl = null;
  createEventDispatcher();
  const downloadImage = async (path) => {
    try {
      const { data } = await supabase.storage.from(
        /*error*/
        "avatars"
      ).getPublicUrl(path);
      avatarUrl = data.publicUrl;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error downloading image: ", err.message);
      }
    }
  };
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.supabase === void 0 && $$bindings.supabase && supabase !== void 0)
    $$bindings.supabase(supabase);
  $$result.css.add(css$1);
  {
    if (url)
      downloadImage(url);
  }
  return `<div class="center svelte-bzj09f">${avatarUrl ? `<img${add_attribute("src", avatarUrl, 0)}${add_attribute("alt", avatarUrl ? "Avatar" : "No image", 0)} class="avatar image svelte-bzj09f">` : `<div class="avatar no-image center svelte-bzj09f" data-svelte-h="svelte-sar8fg">No image</div>`} <input type="hidden" name="avatar_url"${add_attribute("value", url, 0)}> <div class="center svelte-bzj09f"><label class="button primary block" for="single">${escape("Upload")}</label> <input style="visibility: hidden; position:absolute;" type="file" id="single" accept="image/*" ${""}></div> </div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".center-v.svelte-e8h9y1{display:flex;flex-direction:column;width:100%;align-items:center;padding:1em}.editable-section.svelte-e8h9y1{display:flex;height:100%}.text-inputs.svelte-e8h9y1{display:flex;flex-direction:column;gap:2em;padding:1em}.single-input.svelte-e8h9y1{display:flex;justify-content:space-between;gap:1em}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let { session, supabase, profile } = data;
  let profileForm;
  let avatarUrl = profile.avatar_url ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    ({ session, supabase, profile } = data);
    $$rendered = `<div class="center-v svelte-e8h9y1"><h1 data-svelte-h="svelte-18kfhmw">Profile page</h1> <form class="center-v svelte-e8h9y1" method="post" action="?/update"${add_attribute("this", profileForm, 0)}><div class="editable-section svelte-e8h9y1">${validate_component(Avatar, "Avatar").$$render(
      $$result,
      { supabase, url: avatarUrl },
      {
        url: ($$value) => {
          avatarUrl = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="text-inputs svelte-e8h9y1"><div class="single-input svelte-e8h9y1"><label for="email" data-svelte-h="svelte-1p9d3fm">Email</label> <input id="email" type="text"${add_attribute("value", session?.user.email, 0)} disabled></div> <div class="single-input svelte-e8h9y1"><label for="username" data-svelte-h="svelte-1wr0xay">Username</label> <input id="username" name="username" type="text"${add_attribute("value", profile.username, 0)} disabled></div> <div class="single-input svelte-e8h9y1"><label for="profile_text" data-svelte-h="svelte-11042ud">Caption</label> <input id="profile_text" name="profile_text" type="text"${add_attribute("value", form?.profile_text ?? profile.profile_text, 0)}></div></div></div> <div><input type="submit" class="button block primary"${add_attribute("value", "Update", 0)} ${""}></div></form> </div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
