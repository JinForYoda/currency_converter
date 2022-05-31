export namespace Types {
	export const mainCurrencies = ['USD', 'EUR']
	export const baseCurrency = 'UAH'
	export const currencies = [...mainCurrencies, baseCurrency]
	export type AvailableCurrencies = 'UAH' | 'USD' | 'EUR'
	export enum CurrencySigns {
		'UAH' = '₴',
		'EUR' = '€',
		'USD' = '$',
	}

	export type Currency = {
		meta: {
			last_updated_at: string
		}
		data: { [key: string]: SingleCurrency }
	}

	export type SingleCurrency = {
		code: string
		value: number
	}

	export type Currencies = Currency[]

	export interface CurrencyState {
		currencies: Currencies
		loading: boolean
		in: AvailableCurrencies
		out: AvailableCurrencies
		inValue: string
		outValue: string
		coefficient: number
	}

	/*
        REDUCERS
    */
	export const CURRENCY = 'currency'

	/*
        ACTIONS
    */
	export const GET_CURRENCY = CURRENCY + '/getCurrency'

	/*
        API
    */
	export const API = 'https://api.currencyapi.com/v3/latest'
	export const API_KEY = 'o3Sw0L31Se5Mh2JP7GgvHz8iGs17QJ9V5gMJIWoK'
}
