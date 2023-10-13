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
	update: async ({ request, locals, params }) => {
		// get definition data
		const formObjData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const { expression, definition, example } = formObjData;
		const { definition_id } = params;
		if (!definition_id) throw error(404, 'definition not found');

		// verify user authentication
		const session = await locals.getSession();
		if (!session) throw redirect(303, '/auth/login');

		// update the record
		const { data, error: err } = await locals.supabase
			.from('definitions')
			.update({
				expression,
				definition,
				example
			})
			.eq('author_id', session.user.id)
			.eq('id', definition_id)
			.select()
			.single();

		if (err || !data) {
			throw error(404, 'definition not found');
		}

		// redirect to the edited definition page
		throw redirect(303, `/definitions/${definition_id}`);
	}
};
