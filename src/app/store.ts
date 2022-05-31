import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import currencies from './reducers/currencies'

export const store = configureStore({
	reducer: {
		currencies: currencies,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
