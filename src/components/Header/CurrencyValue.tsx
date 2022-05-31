import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useAppSelector } from '../../app/hooks'
import { Types } from '../../utils/Types'
import Loader from '../Loader'

interface CurrencyValueProps {
	currency: string
	mainCurrencies: Types.Currency['data'][]
}

const renderTooltip = (props: any) => (
	<Tooltip id='cur-tooltip' {...props}>
		Buy | Sell
	</Tooltip>
)

export default function CurrencyValue({
	currency,
	mainCurrencies,
}: CurrencyValueProps) {
	const isLoading = useAppSelector((state) => state.currencies.loading)
	// rought code because of api response
	const sellObj = mainCurrencies.find((cur) =>
		Object.keys(cur).includes(currency)
	)
	const sell = sellObj
		? sellObj[currency].value < 0.1
			? sellObj[currency].value.toFixed(3)
			: sellObj[currency].value.toFixed(2)
		: ''

	const buyObj = mainCurrencies.find((cur) =>
		Object.keys(cur).includes(Types.baseCurrency)
	)
	const buy = buyObj
		? buyObj[Types.baseCurrency].value < 0.1
			? buyObj[Types.baseCurrency].value.toFixed(3)
			: buyObj[Types.baseCurrency].value.toFixed(2)
		: ''

	return isLoading ? (
		<Loader isSmall />
	) : (
		<OverlayTrigger
			placement='bottom'
			delay={{ show: 0, hide: 100 }}
			overlay={renderTooltip}
		>
			<span>{sell + ' | ' + buy}</span>
		</OverlayTrigger>
	)
}
