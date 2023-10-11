import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// get all expressions with authors from the database
	const { data, error: err } = await locals.supabase
		.from('definitions')
		.select('id, expression, profiles!definitions_author_id_fkey(username, avatar_url)');

	if (err) {
		console.error('error', err);
		throw error(500, { message: 'Server error, try again later.' });
	}

	return { def_summaries: data };
};
