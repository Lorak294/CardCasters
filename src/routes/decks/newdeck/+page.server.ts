import db from '$lib/database/database';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createDeck: async ({ request }) => {
		// retreive form data
		const formData = await request.formData();
		const deckName = String(formData.get('deckName'));
		const authorId = Number(formData.get('authorId'));

		// error handling
		if (!deckName) {
			return fail(400, { deckName, missing: true });
		}
		if (!authorId) {
			return fail(400, { authorId, missing: true });
		}

		// add new empty deck to the database
		const newdeck = await db.deck.create({
			data: {
				name: deckName,
				authorId: authorId
			}
		});

		return { success: true };
	}
};
