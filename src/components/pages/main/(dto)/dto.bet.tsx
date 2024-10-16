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
	server: string;
	typeBet: typeBet;
	amount: string;
	uid: string;
	betId: string;
	place: typePlace;
}

export interface BetPlace {
	c: number;
	l: number;
	t: number;
	x: number;
}

export interface BetInfo {
	_id: string;
	place: BetPlace;
	timeEnd: Date;
	before_result: string;
	result: string;
	key_result: string;
	server: string;
	isEnd: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface Message {
	content: string;
	meta: {
		avatar: string;
		vip: string;
		clan: string;
		rank: string;
		uid: string;
	};
	server: string;
}
