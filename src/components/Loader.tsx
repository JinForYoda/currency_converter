import { Spinner } from 'react-bootstrap'

interface LoaderProps {
	isSmall?: boolean
}

export default function Loader({ isSmall }: LoaderProps) {
	return (
		<div className='w-100 d-flex justify-content-center'>
			<Spinner
				animation='border'
				role='status'
				size={isSmall ? 'sm' : undefined}
			>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	)
}
