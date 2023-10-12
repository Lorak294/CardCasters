import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	// verify user authentication
	const session = await locals.getSession();
	if (!session) throw redirect(303, '/auth/login');

	// get definition
	const { definition_id } = params;
	const { data, error: err } = await locals.supabase
		.from('definitions')
		.select('*')
		.eq('author_id', session.user.id)
		.eq('id', definition_id)
		.single();

	if (err || !data) {
		throw error(404, 'definition not found');
	}

	return { definition: data };
};

export const actions: Actions = {
	update: async ({ request, locals }) => {}
};
