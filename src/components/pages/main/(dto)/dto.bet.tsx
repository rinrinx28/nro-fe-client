export type typeBet = 'cl' | 'g' | 'x';

export type typePlace =
	| 'C'
	| 'L'
	| 'T'
	| 'X'
	| 'CT'
	| 'CX'
	| 'LT'
	| 'LX'
	| string;

export interface BetField {
	server?: string;
	typeBet?: typeBet;
	amount?: string;
	uid?: string;
	betId?: string;
	place?: typePlace;
}

export interface MessageField {
	content?: string;
	meta?: Record<string, any>;
	uid?: string;
	token?: string;
	server?: string;
}
