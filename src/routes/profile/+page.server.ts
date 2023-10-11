import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// auth
	const session = await locals.getSession();
	if (!session) throw redirect(303, '/auth/login');

	// get profile
	const { data, error: err } = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();
	if (!data || err) {
		throw error(500, {
			message: 'Server error, try again later'
		});
	}

	// return profile data
	return { profile: data };
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		// get form data
		const formDataObj = Object.fromEntries(await request.formData()) as Record<string, string>;
		const { profile_text, avatar_url } = formDataObj;

		const session = await locals.getSession();
		if (!session)
			throw error(500, {
				message: 'Server error, try again later'
			});
		const { error: err } = await locals.supabase
			.from('profiles')
			.update({
				avatar_url,
				profile_text
			})
			.eq('id', session?.user.id);

		if (err) {
			throw error(500, {
				message: 'Server error, try again later'
			});
		}
		// return form data
		return {
			profile_text,
			avatar_url
		};
	}
};
