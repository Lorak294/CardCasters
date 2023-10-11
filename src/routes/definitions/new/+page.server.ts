import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ZodError, z } from 'zod';
import { AuthApiError } from '@supabase/supabase-js';

const newDefinitionSchema = z.object({
	expression: z
		.string({ required_error: 'required' })
		.min(1, { message: 'required' })
		.max(64, { message: 'must be less than 64 characters long' })
		.trim(),
	definition: z
		.string({ required_error: 'required' })
		.min(1, { message: 'required' })
		.max(512, { message: 'must be less than 512 characters long' })
		.trim(),
	example: z
		// .string({required_error: 'required'})
		//.min(1,{message: 'required'})
		.string()
		.max(512, { message: 'must be less than 512 characters long' })
		.trim()
});

export const load: PageServerLoad = async ({ locals }) => {
	// redirect annonymous users with to the signin page
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, '/auth/login');
	}
	return {};
};

export const actions: Actions = {
	create_definition: async ({ request, locals }) => {
		const formDataObj = Object.fromEntries(await request.formData()) as Record<string, string>;
		const { expression, definition, example, author_id } = formDataObj;
		const returnData = { expression, definition, example };

		// validation
		try {
			const res = newDefinitionSchema.parse(formDataObj);
			console.log('def. validation success');
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();
			console.log(errors);
			return {
				data: returnData,
				errors
			};
		}

		// create new definition record
		const { data, error: err } = await locals.supabase
			.from('definitions')
			.insert({
				author_id,
				expression,
				definition,
				example
			})
			.select()
			.single();

		if (err) {
			console.error(err);
			return fail(500, {
				data: returnData,
				messeage: 'Server error, please try again later.'
			});
		}

		console.log('definition creation success');
		throw redirect(303, `/definitions/${data.id}`);
	}
};
