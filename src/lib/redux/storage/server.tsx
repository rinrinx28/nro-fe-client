import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

// Define the initial state using that type
const initialState: number = 0;

export const Server = createSlice({
	name: 'server',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setServer: (state, actions: PayloadAction<number>) => {
			// Kiểm tra xem localStorage có khả dụng không
			if (typeof window !== 'undefined' && window.localStorage) {
				localStorage.setItem('server', `${actions.payload}`);
			}
			return actions.payload;
		},
	},
});

export const { setServer } = Server.actions;

export default Server.reducer;
