import { r as redirect } from "../../../../chunks/index.js";
const GET = async ({ url, locals }) => {
  const code = url.searchParams.get("code");
  if (code) {
    await locals.supabase.auth.exchangeCodeForSession(code);
  }
  throw redirect(303, "/");
};
export {
  GET
};
