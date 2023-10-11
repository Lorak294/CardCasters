import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { z } from "zod";
import { AuthApiError } from "@supabase/supabase-js";
const loginSchema = z.object({
  email: z.string({ required_error: "required" }).min(1, { message: "required" }).max(64, { message: "must be less than 64 characters long" }).email({ message: "must be a valid email address" }),
  password: z.string({ required_error: "required" }).min(8, { message: "must be at least 8 characters long" }).max(64, { message: "must be less than 64 characters long" }).trim()
});
const load = async ({ locals }) => {
  const session = await locals.getSession();
  if (session) {
    throw redirect(302, "/");
  }
  return {};
};
const actions = {
  login: async ({ request, locals }) => {
    const formDataObj = Object.fromEntries(await request.formData());
    const { email, password } = formDataObj;
    try {
      const res = loginSchema.parse(formDataObj);
    } catch (err2) {
      const { password: password2, ...rest } = formDataObj;
      return {
        messeage: "invalid credentials",
        data: rest
      };
    }
    const { data, error: err } = await locals.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          messeage: "invalid credentials"
        });
      }
      return fail(500, { message: "Server error, try again later." });
    }
    throw redirect(303, "/");
  }
};
export {
  actions,
  load
};
