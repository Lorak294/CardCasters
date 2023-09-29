import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { z } from 'zod';

const loginSchema = z.object({
	email: z
		.string({ required_error: 'required' })
		.min(1, { message: 'required' })
		.max(64, { message: 'must be less than 64 characters long' })
		.email({ message: 'must be a valid email address' }),
	password: z
		.string({ required_error: 'required' })
		.min(8, { message: 'must be at least 8 characters long' })
		.max(64, { message: 'must be less than 64 characters long' })
		.trim()
});

export const load: PageServerLoad = async ({ locals }) => {
	// redirect users with valid session to the homepage
	// const session = await locals.auth.validate();
	// if (session) {
	// 	throw redirect(302, '/');
	// }
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formDataObj = Object.fromEntries(await request.formData()) as Record<string, string>;
		const { email, password } = formDataObj;

		// validation
		try {
			const res = loginSchema.parse(formDataObj);
		} catch (err) {
			const { password, ...rest } = formDataObj;
			return {
				messeage: 'invalid credentials',
				data: rest
			};
		}

		try {
			// find user by key and validate password
			const key = await auth.useKey('email', email, password);
			// create new session
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			// set session in cookie
			locals.auth.setSession(session);
		} catch (err) {
			if (
				err instanceof LuciaError &&
				(err.message === 'AUTH_INVALID_KEY_ID' || err.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist or invallid password
				return fail(400, { messeage: 'invalid credentials' });
			}
			// unknown error
			return fail(500, { messeage: 'an unknown error has occured' });
		}

		// redirect after sucessful login
		throw redirect(302, '/');
	}
};
