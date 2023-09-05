import { mockUser } from '$lib/mockdata';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('/api/login');
	const user = (await res.json()) as User;
	return { user };
};
