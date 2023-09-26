import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/player');
	const player = (await res.json()) as Player;

	return {
		player
	};
};
