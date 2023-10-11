import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { z } from "zod";
import { AuthApiError } from "@supabase/supabase-js";
const registerSchema = z.object({
  email: z.string({ required_error: "required" }).min(1, { message: "required" }).max(64, { message: "must be less than 64 characters long" }).email({ message: "must be a valid email address" }),
  username: z.string({ required_error: "required" }).min(1, { message: "required" }).max(64, { message: "must be less than 64 characters long" }).trim(),
  password: z.string({ required_error: "required" }).min(8, { message: "must be at least 8 characters long" }).max(64, { message: "must be less than 64 characters long" }).trim(),
  passwordConfirm: z.string({ required_error: "required" }).min(8, { message: "must be at least 8 characters long" }).max(64, { message: "must be less than 64 characters long" }).trim()
}).superRefine(({ passwordConfirm, password }, ctx) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: "custom",
      message: "password and confirm password must match",
      path: ["password"]
    });
    ctx.addIssue({
      code: "custom",
      message: "password and confirm password must match",
      path: ["passwordConfirm"]
    });
  }
});
const load = async ({ locals }) => {
  const session = await locals.getSession();
  if (session) {
    throw redirect(302, "/");
  }
  return {};
};
async function checkIfUsernameTaken(sb, username) {
  const { count, error: err } = await sb.from("profiles").select("*", { count: "exact", head: true }).eq("username", username);
  if (count === null || err) {
    throw "db error";
  }
  return count > 0;
}
function username_error(message) {
  return { username: [message] };
}
const actions = {
  register: async ({ request, locals, url }) => {
    const formDataObj = Object.fromEntries(await request.formData());
    const { email, username, password } = formDataObj;
    const returnData = { email, username };
    try {
      const res = registerSchema.parse(formDataObj);
      console.log("validation success");
    } catch (err2) {
      const { fieldErrors: errors } = err2.flatten();
      console.log(errors);
      return {
        data: returnData,
        errors
      };
    }
    try {
      if (await checkIfUsernameTaken(locals.supabase, username)) {
        return fail(500, {
          data: returnData,
          errors: username_error("username already taken")
        });
      }
    } catch (err2) {
      return fail(500, {
        data: returnData,
        messeage: "Server error, please try again later."
      });
    }
    console.log("username check success");
    const { data, error: err } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        },
        emailRedirectTo: `${url.origin}/auth/callback`
      }
    });
    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          data: returnData,
          messeage: "invalid email or password."
        });
      }
      return fail(500, {
        data: returnData,
        messeage: "Server error, please try again later."
      });
    }
    console.log("sign in success");
    throw redirect(303, "/register/confirm");
  }
};
export {
  actions,
  load
};
