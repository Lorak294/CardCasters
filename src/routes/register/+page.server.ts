import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect users with valid session to the homepage
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { email, username, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		// ADD VALIDATION

		// creating new user record
		try {
			await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: email, // unique id for email auth method
					password // hashed by Lucia
				},
				attributes: {
					username,
					email
				}
			});
		} catch (err) {
			console.log(err);

			// MAY BE WRONG
			if (
				err instanceof
				PrismaClientKnownRequestError /* && e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR */
			) {
				return fail(400, {
					messeage: 'There is already an account for this email address.'
				});
			}

			return fail(400, { messeage: 'Could not register user' });
		}
		throw redirect(302, '/login');
	}
};
