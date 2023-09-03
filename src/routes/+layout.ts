import { mockUser } from '$lib/mockdata';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	return {
		user: mockUser
	};
};
