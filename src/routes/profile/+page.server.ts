import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	return {
		userId: session.user.userId,
		email: session.user.email,
		username: session.user.username
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		// invalidate session
		await auth.invalidateSession(session.sessionId);
		// remove cookie
		locals.auth.setSession(null);
		// redirect to login page
		throw redirect(302, '/login');
	}
};
