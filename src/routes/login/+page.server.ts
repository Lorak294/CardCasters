import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect users with valid session to the homepage
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		// ADD validation

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
				return fail(400, { messeage: 'Incorrect email or password' });
			}
			// unknown error
			return fail(500, { messeage: 'An unknown error has occured' });
		}

		// redirect after sucessful login
		throw redirect(302, '/');
	}
};
