import { useNavigate } from 'react-router-dom'

import classes from './mainButton.module.scss'

export const MainButton = ({ id }) => {
	const navigate = useNavigate()

	const clickHandler = () => {
		navigate(`/prediction/${id}`)
	}

	return (
		<button className={classes.mainButton} onClick={clickHandler}>
			<div>Судьбаносный ПУНЬК</div>
		</button>
	)
}
