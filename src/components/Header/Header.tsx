import { useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useAppDispatch } from '../../app/hooks'
import { Fetch, Tools } from '../../utils/Tools'
import Currencies from './Currencies'

export default function Header() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const currencies = Tools.getCurApiArr()
		currencies.forEach((api) => {
			dispatch(Fetch.getCurrency(api))
		})
	}, [dispatch])

	return (
		<Navbar bg='dark' variant='dark' style={{ cursor: 'default' }}>
			<Container className='justify-space-between'>
				<Currencies />
				<Navbar.Brand>Created by Max Ryaguzov</Navbar.Brand>
			</Container>
		</Navbar>
	)
}
