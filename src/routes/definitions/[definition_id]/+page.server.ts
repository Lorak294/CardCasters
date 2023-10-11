import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SupabaseClient } from '@supabase/supabase-js';

async function fetchDefintionWithAuthor(supabase: SupabaseClient, definition_id: string) {
	// get definiton with author
	let { data, error: err } = await supabase
		.from('definitions')
		.select('*, profiles!definitions_author_id_fkey(*)')
		.eq('id', definition_id)
		.single();

	if (err || !data || !data.profiles) {
		throw new Error('definition not found');
	}

	return data;
}

async function fetchCurrentVoteForUser(
	supabase: SupabaseClient,
	definition_id: string,
	user_id: string
) {
	let { data, error: err } = await supabase
		.from('votes')
		.select('vote_score')
		.eq('definition_id', definition_id)
		.eq('user_id', user_id)
		.single();

	if (err) return 0;
	if (!data) return 0;
	return data.vote_score as number;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const { definition_id } = params;
	const session = await locals.getSession();

	try {
		// get definiton with author
		const { profiles: author, ...definition } = await fetchDefintionWithAuthor(
			locals.supabase,
			definition_id
		);

		// get current vote
		const current_vote = session
			? fetchCurrentVoteForUser(locals.supabase, definition_id, session.user.id)
			: 0;

		return { definition, author, current_vote };
	} catch (err) {
		throw error(404, { message: (err as Error).message });
	}
};

export const actions: Actions = {
	vote: async ({ locals, request }) => {
		const formObjData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const { definition_id, vote_score } = formObjData;

		const session = await locals.getSession();
		if (!session) throw error(401, 'In order to vote sign in first.');

		console.log(definition_id);

		const { error: err } = await locals.supabase.from('votes').upsert({
			definition_id,
			user_id: session?.user.id,
			vote_score: parseInt(vote_score)
		});

		if (err) {
			console.error(err);
			throw error(500, 'Server error try again later');
		}
	}
};
