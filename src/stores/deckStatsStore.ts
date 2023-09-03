import { writable, get, type Writable } from 'svelte/store';

class DeckStatsStore {
	deckStats: Writable<DeckStats[]>;

	constructor() {
		this.deckStats = writable([]);
	}
}

export const deckStatsState = new DeckStatsStore();
