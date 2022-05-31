import { useAppSelector } from '../../app/hooks'
import { Tools } from '../../utils/Tools'
import { Types } from '../../utils/Types'
import CurrencyValue from './CurrencyValue'

export default function Currencies() {
	const currencies = useAppSelector((state) => state.currencies.currencies)
	return (
		<div className='text-white d-flex gap-2'>
			{Types.mainCurrencies.map((currency) => (
				<h6 key={currency} className='d-flex gap-1'>
					{currency}
					{': '}
					<CurrencyValue
						currency={currency}
						mainCurrencies={Tools.getMainCurrencies(
							currency,
							currencies
						)}
					/>
				</h6>
			))}
		</div>
	)
}
