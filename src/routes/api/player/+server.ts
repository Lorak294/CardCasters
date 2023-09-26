import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { mockLoggedPlayer } from '$lib/mockdata';

export const GET: RequestHandler = () => {
	return json(mockLoggedPlayer);
};
