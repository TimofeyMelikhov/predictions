import { useNavigate } from 'react-router-dom'

import classes from './mainButton.module.scss'

export const MainButton = () => {
	const navigate = useNavigate()

	const clickHandler = () => {
		navigate('/loading')
	}

	return (
		<button className={classes.mainButton} onClick={clickHandler}>
			<div>Судьбаносный ПУНЬК</div>
		</button>
	)
}
