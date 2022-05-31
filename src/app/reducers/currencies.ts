import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Types } from '../../utils/Types'
import { Fetch, Tools } from '../../utils/Tools'

const initialState: Types.CurrencyState = {
	currencies: [],
	loading: false,
	in: 'UAH',
	out: 'USD',
	inValue: '1',
	outValue: '',
	coefficient: 0,
}

export const currencies = createSlice({
	name: Types.CURRENCY,
	initialState,
	reducers: {
		// change IN currency
		changeInCur: (
			state,
			action: PayloadAction<Types.AvailableCurrencies>
		) => {
			state.in = action.payload
		},
		// change OUT currency
		changeOutCur: (
			state,
			action: PayloadAction<Types.AvailableCurrencies>
		) => {
			state.out = action.payload
		},

		// change IN value
		changeInValue: (state, action: PayloadAction<string>) => {
			state.inValue = action.payload
		},
		// change OUT value
		changeOutValue: (state, action: PayloadAction<string>) => {
			state.outValue = action.payload
		},

		// when change coefficient do calculate in both ways
		setCoefficient: (state) => {
			state.coefficient = Tools.setCoefficient(
				state.currencies,
				state.in,
				state.out
			)
			state.outValue = Tools.calculate(
				state.coefficient,
				state.inValue,
				state.outValue
			)
			state.inValue = Tools.calculate(
				state.coefficient,
				state.inValue,
				state.outValue,
				true
			)
		},

		// calculate on straight way
		calculateStraight: (state) => {
			state.outValue = Tools.calculate(
				state.coefficient,
				state.inValue,
				state.outValue
			)
		},
		// calculate on reverse way
		calculateReverse: (state) => {
			state.inValue = Tools.calculate(
				state.coefficient,
				state.inValue,
				state.outValue,
				true
			)
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(Fetch.getCurrency.pending, (state) => {
				state.loading = true
			})
			.addCase(
				Fetch.getCurrency.fulfilled,
				(state, action: PayloadAction<Types.Currency>) => {
					state.currencies.push(action.payload)
					if (state.currencies.length === Types.currencies.length) {
						state.loading = false
						// set coefficient and calculate on straight way
						state.coefficient = Tools.setCoefficient(
							state.currencies,
							state.in,
							state.out
						)
						state.outValue = Tools.calculate(
							state.coefficient,
							state.inValue,
							state.outValue
						)
					}
				}
			)
	},
})

export const {
	changeInCur,
	changeOutCur,
	changeInValue,
	changeOutValue,
	setCoefficient,
	calculateStraight,
	calculateReverse,
} = currencies.actions
export default currencies.reducer
