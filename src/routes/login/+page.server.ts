import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { AuthApiError } from '@supabase/supabase-js';

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
	const session = await locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
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

		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					messeage: 'invalid credentials'
				});
			}
			return fail(500, { message: 'Server error, try again later.' });
		}

		// redirect after sucessful login
		throw redirect(303, '/');
	}
};
