import { r as redirect } from "../../../../../chunks/index.js";
const load = async ({ locals }) => {
  const session = await locals.getSession();
  if (session) {
    throw redirect(302, "/auth/login");
  }
  return {};
};
export {
  load
};
