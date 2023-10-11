import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type ZodError, z } from 'zod';
import { AuthApiError, type SupabaseClient } from '@supabase/supabase-js';

const registerSchema = z
	.object({
		email: z
			.string({ required_error: 'required' })
			.min(1, { message: 'required' })
			.max(64, { message: 'must be less than 64 characters long' })
			.email({ message: 'must be a valid email address' }),
		username: z
			.string({ required_error: 'required' })
			.min(1, { message: 'required' })
			.max(64, { message: 'must be less than 64 characters long' })
			.trim(),
		password: z
			.string({ required_error: 'required' })
			.min(8, { message: 'must be at least 8 characters long' })
			.max(64, { message: 'must be less than 64 characters long' })
			.trim(),
		passwordConfirm: z
			.string({ required_error: 'required' })
			.min(8, { message: 'must be at least 8 characters long' })
			.max(64, { message: 'must be less than 64 characters long' })
			.trim()
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'password and confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'password and confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const load: PageServerLoad = async ({ locals }) => {
	// redirect users with valid session to the homepage
	const session = await locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
	return {};
};

async function checkIfUsernameTaken(sb: SupabaseClient, username: string) {
	const { count, error: err } = await sb
		.from('profiles')
		.select('*', { count: 'exact', head: true })
		.eq('username', username);

	if (count === null || err) {
		console.log(err);
		throw 'db error';
	}
	return count > 0;
}

function username_error(message: string) {
	return { username: [message] } as {
		[x: string]: string[] | undefined;
		[x: number]: string[] | undefined;
		[x: symbol]: string[] | undefined;
	};
}

export const actions: Actions = {
	register: async ({ request, locals, url }) => {
		const formDataObj = Object.fromEntries(await request.formData()) as Record<string, string>;
		const { email, username, password } = formDataObj;
		const returnData = { email, username };

		// validation
		try {
			const res = registerSchema.parse(formDataObj);
			console.log('validation success');
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();
			console.log(errors);
			return {
				data: returnData,
				errors
			};
		}

		// check if username is taken
		try {
			if (await checkIfUsernameTaken(locals.supabase, username)) {
				return fail(500, {
					data: returnData,
					errors: username_error('username already taken')
				});
			}
		} catch (err) {
			console.log(err);
			return fail(500, {
				data: returnData,
				messeage: 'Server error, please try again later.'
			});
		}
		console.log('username check success');

		// creating new user record
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
					messeage: 'invalid email or password.'
				});
			}
			return fail(500, {
				data: returnData,
				messeage: 'Server error, please try again later.'
			});
		}
		console.log('sign in success');
		throw redirect(303, '/auth/register/confirm');
	}
};
