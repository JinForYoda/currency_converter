import { createAsyncThunk } from '@reduxjs/toolkit'
import { Types } from './Types'

export namespace Tools {
	export const getCurApiArr = (): string[] => {
		const apiArr: string[] = []
		Types.currencies.forEach((base_currency) => {
			const currencies = Types.currencies
				.filter((cur) => cur !== base_currency)
				.join('%2C')
			apiArr.push(
				Types.API +
					`?apikey=${Types.API_KEY}&currencies=${currencies}&base_currency=${base_currency}`
			)
		})
		return apiArr
	}

	export const getMainCurrencies = (
		currency: string,
		allCurrencies: Types.Currencies
	): Types.Currency['data'][] => {
		return allCurrencies
			.filter(
				(cur) =>
					!Object.keys(cur.data).includes(Types.baseCurrency) ||
					!Object.keys(cur.data).includes(currency)
			)
			.map((cur) => cur.data)
	}

	export const setCoefficient = (
		currencies: Types.Currencies,
		inCur: Types.AvailableCurrencies,
		outCur: Types.AvailableCurrencies
	): number => {
		const currency = currencies.find(
			(cur) => !Object.keys(cur.data).includes(inCur)
		)
		if (currency) {
			if (inCur === outCur) {
				return 1
			}
			return currency.data[outCur].value
		}
		return 0
	}

	export const calculate = (
		coefficient: number,
		inValue: string,
		outValue: string,
		reverse?: boolean
	): string => {
		if (reverse) {
			const res = +outValue / +coefficient
			return String(res)
		}
		const res = +inValue * +coefficient
		return String(res)
	}
}

export namespace Fetch {
	/*
        GET CURRENCY
    */
	export const getCurrency = createAsyncThunk(
		Types.GET_CURRENCY,
		async (api: string) => {
			const response = await fetch(api)
			const currency: Types.Currency = await response.json()
			return currency
		}
	)
}
