import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect users with valid session to the homepage
	const session = await locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
	return {};
};
