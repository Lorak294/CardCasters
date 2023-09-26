import { mockUser } from '$lib/mockdata';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	//const res = await fetch('/api/login');
	//const user = (await res.json()) as User;
	//return { user };

	const session = await locals.auth.validate();

	return { user: session?.user };
};
