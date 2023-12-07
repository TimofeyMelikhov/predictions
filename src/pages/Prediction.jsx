import { Link, useParams } from 'react-router-dom'

export const Prediction = () => {
	const { id } = useParams()

	return (
		<>
			<Link to='/'>Назад</Link>
			<div>Prediction: {id}</div>
		</>
	)
}
