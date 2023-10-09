// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session, SupabaseClient } from '@supabase/supabase-js';

//import type { Validate, ValidateUser, SetSession } from '@lucia-auth/sveltekit';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

// export {};

// interface Card {
// 	id: string;
// 	text: string;
// 	isAnswer: boolean;
// }

// interface Player {
// 	id: number;
// 	name: string;
// 	score: number;
// 	state: PlayerState;
// 	role: PlayerRole;
// }

// interface Answer {
// 	submiter: Player;
// 	card: Card;
// }

// interface User {
// 	id: string;
// 	username: string;
// 	email: string;
// }

// interface Deck {
// 	id: string;
// 	createdAt: Date;
// 	updatedAt: Date;
// 	author: User;
// 	name: string;
// 	code: string;
// 	answerCards: Card[];
// 	questionCards: Card[];
// }

// interface DeckSummary {
// 	id: string;
// 	creator: User;
// 	name: string;
// 	code: string;
// 	answerCardsCount: number;
// 	questionCardsCount: number;
// }
