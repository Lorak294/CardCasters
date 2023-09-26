import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const customHandle: Handle = async ({ resolve, event }) => {
	// ADD custom logic here
	return resolve(event);
};

export const authHandle: Handle = async ({ resolve, event }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};

export const handle: Handle = sequence(authHandle, customHandle);
