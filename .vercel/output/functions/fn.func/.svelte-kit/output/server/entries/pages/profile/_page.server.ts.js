import { r as redirect, e as error } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  const session = await locals.getSession();
  if (!session)
    throw redirect(303, "/auth/login");
  const { data, error: err } = await locals.supabase.from("profiles").select("*").eq("id", session.user.id).single();
  if (!data || err) {
    throw error(500, {
      message: "Server error, try again later"
    });
  }
  return { profile: data };
};
const actions = {
  update: async ({ request, locals }) => {
    const formDataObj = Object.fromEntries(await request.formData());
    const { profile_text, avatar_url } = formDataObj;
    const session = await locals.getSession();
    if (!session)
      throw error(500, {
        message: "Server error, try again later"
      });
    const { error: err } = await locals.supabase.from("profiles").update({
      avatar_url,
      profile_text
    }).eq("id", session?.user.id);
    if (err) {
      throw error(500, {
        message: "Server error, try again later"
      });
    }
    return {
      profile_text,
      avatar_url
    };
  }
};
export {
  actions,
  load
};
