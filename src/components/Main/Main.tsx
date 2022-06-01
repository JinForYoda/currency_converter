import { BrowserRouter } from 'react-router-dom'
import Converter from './Converter'

export default function Main() {
	return (
		<BrowserRouter basename='/currency_converter'>
			<Converter />
		</BrowserRouter>
	)
}
