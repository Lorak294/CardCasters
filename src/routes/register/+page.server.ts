import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError, z } from 'zod';

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

export const actions: Actions = {
	default: async ({ request }) => {
		const formDataObj = Object.fromEntries(await request.formData()) as Record<string, string>;
		const { email, username, password } = formDataObj;

		// validation
		try {
			const res = registerSchema.parse(formDataObj);
			console.log('success');
			console.log(res);
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();
			const { password, passwordConfirm, ...rest } = formDataObj;
			return {
				data: rest,
				errors
			};
		}

		// creating new user record
		try {
			await auth.createUser({
				userId: undefined,
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
					messeage: 'There is already an account for this email address or with this username.'
				});
			}

			return fail(400, { messeage: 'Could not register user' });
		}
		throw redirect(302, '/login');
	}
};
