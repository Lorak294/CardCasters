//import db from '$lib/database';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addNewCard: async ({ request }) => {
		const formData = await request.formData();
		const cardText = String(formData.get('cardText'));
		const userId = Number(formData.get('userId'));
		const deckId = Number(formData.get('deckId'));
		const isAnswerNum = Number(formData.get('isAnswerNum'));

		console.log('called add new');
		// error handling
		if (!cardText || !userId || !deckId || isAnswerNum < 0 || isAnswerNum > 1) {
			return fail(400, { success: false, data: Object.fromEntries(formData) });
		}
		// ADD : check if authorID is userID

		// const newCard = await db.card.create({
		// 	data: {
		// 		deckId,
		// 		isAnswer: isAnswerNum > 0,
		// 		text: cardText
		// 	}
		// });

		return { success: true, data: Object.fromEntries(formData) };
	},

	updateCard: async ({ request }) => {
		const formData = await request.formData();

		const cardText = String(formData.get('cardText'));
		const userId = Number(formData.get('userId'));
		const deckId = Number(formData.get('deckId'));
		const cardId = Number(formData.get('cardId'));

		// error handling
		if (!cardText || !userId || !deckId || !cardId) {
			return fail(400, { success: false, data: Object.fromEntries(formData) });
		}
		// ! ADD : check if authorID is userID

		// const newCard = await db.card.update({
		// 	where: {
		// 		id: cardId,
		// 		deckId: deckId
		// 	},
		// 	data: {
		// 		text: cardText
		// 	}
		// });

		return { success: true, data: Object.fromEntries(formData) };
	},

	deleteCard: async ({ request }) => {
		const formData = await request.formData();
		const userId = Number(formData.get('userId'));
		const deckId = Number(formData.get('deckId'));
		const cardId = Number(formData.get('cardId'));

		// error handling
		if (!userId || !deckId || !cardId) {
			return fail(400, { success: false, data: Object.fromEntries(formData) });
		}
		// ! ADD : check if authorID is userID

		// const deletedCard = await db.card.delete({
		// 	where: {
		// 		id: cardId,
		// 		deckId: deckId
		// 	}
		// });

		return { success: true };
	}
};
