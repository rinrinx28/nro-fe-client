export type TypeEShop = 'gold' | 'rgold';

export interface InputField {
	playerName?: string;
	type: string;
	amount?: string;
	typeGold: TypeEShop;
	server?: string;
}
