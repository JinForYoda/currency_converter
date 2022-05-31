import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Converter from './Converter'

export default function Main() {
	return (
		<BrowserRouter basename='/currency_converter'>
			<Routes>
				<Route path='/' element={<Converter />} />
			</Routes>
		</BrowserRouter>
	)
}
