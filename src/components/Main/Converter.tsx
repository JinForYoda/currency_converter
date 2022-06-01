import React from 'react'
import {
	Dropdown,
	DropdownButton,
	FormControl,
	InputGroup,
} from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	changeInCur,
	changeOutCur,
	calculateReverse,
	calculateStraight,
	changeInValue,
	changeOutValue,
	setCoefficient,
} from '../../app/reducers/currencies'
import { Types } from '../../utils/Types'

export default function Converter() {
	const dispatch = useAppDispatch()

	const inCur = useAppSelector((state) => state.currencies.in)
	const outCur = useAppSelector((state) => state.currencies.out)
	const inValue = useAppSelector((state) => state.currencies.inValue)
	const outValue = useAppSelector((state) => state.currencies.outValue)

	const onClickIn = (e: React.MouseEvent) => {
		const target = e.target as HTMLDivElement
		// switch when selected same currencies
		if (target.textContent === outCur) {
			dispatch(changeOutCur(inCur))
		}
		dispatch(changeInCur(target.textContent as Types.AvailableCurrencies))
		dispatch(setCoefficient())
	}
	const onClickOut = (e: React.MouseEvent) => {
		const target = e.target as HTMLDivElement
		// switch when selected same currencies
		if (target.textContent === inCur) {
			dispatch(changeInCur(outCur))
		}

		dispatch(changeOutCur(target.textContent as Types.AvailableCurrencies))
		dispatch(setCoefficient())
	}
	const onChangeInValue = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement
		dispatch(changeInValue(target.value))
		dispatch(calculateStraight())
	}
	const onChangeOutValue = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement
		dispatch(changeOutValue(target.value))
		dispatch(calculateReverse())
	}

	return (
		<div className='border border-3 rounded border-dark p-5 mt-5'>
			<>
				<h3 className='mb-3'>Converter</h3>
				<InputGroup className='mb-3'>
					<DropdownButton
						variant='outline-dark'
						title=''
						id='input-group-dropdown-1'
						size='sm'
					>
						{Types.currencies.map((currency) => (
							<Dropdown.Item
								href='#'
								key={currency}
								onClick={onClickIn}
							>
								{currency}
							</Dropdown.Item>
						))}
					</DropdownButton>
					<InputGroup.Text>
						{Types.CurrencySigns[inCur]}
					</InputGroup.Text>
					<FormControl
						aria-label='Text input with dropdown button'
						type='number'
						placeholder='1.23'
						value={inValue}
						onChange={onChangeInValue}
						min={0}
					/>
				</InputGroup>
				<InputGroup className='mb-3'>
					<DropdownButton
						variant='outline-dark'
						title=''
						id='input-group-dropdown-1'
						size='sm'
					>
						{Types.currencies.map((currency) => (
							<Dropdown.Item
								href='#'
								key={currency}
								onClick={onClickOut}
							>
								{currency}
							</Dropdown.Item>
						))}
					</DropdownButton>
					<InputGroup.Text>
						{Types.CurrencySigns[outCur]}
					</InputGroup.Text>
					<FormControl
						aria-label='Text input with dropdown button'
						type='number'
						placeholder='2.34'
						value={outValue}
						onChange={onChangeOutValue}
						min={0}
					/>
				</InputGroup>
			</>
		</div>
	)
}
