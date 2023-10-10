import { lucia } from 'lucia';
import { dev } from '$app/environment';
import { sveltekit } from 'lucia/middleware';
import db from '$lib/database/database';
import { prisma } from '@lucia-auth/adapter-prisma';

export const auth = lucia({
	adapter: prisma(db),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username,
			email: data.email
		};
	}
});

export type Auth = typeof auth;
