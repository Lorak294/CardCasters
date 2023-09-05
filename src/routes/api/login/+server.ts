import db from '$lib/database';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// TEMPORARY IMPLEMENTATION: returns first user from the db
	const res = await db.user.findFirst();
	return json(res);
};
