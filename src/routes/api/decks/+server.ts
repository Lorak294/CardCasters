import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { mockDecksStats } from '$lib/mockdata';

export const GET: RequestHandler = () => {
	return json(mockDecksStats);
};
