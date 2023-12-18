import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrackEnded } from 'src/store/predictionSlice'
import { setProgress } from 'src/store/progressSlice'

import classes from './progressbar.module.scss'

export const ProgressBar = () => {
	const navigate = useNavigate()
	const progress = useSelector(state => state.progressSlice.value)
	const dispatch = useDispatch()
	const prediction = useSelector(state => state.predictionSlice.predictions)
	const { trackEnded } = useSelector(state => state.predictionSlice)

	const randomId = Math.floor(Math.random() * prediction.length) + 1

	const progressPhrases = [
		'Читаем вашу натальную карту, подождите еще чуть-чуть',
		'Соединяемся с космосом, в поисках вашей судьбы',
		'На созвоне с астрологом, потерпите еще чуть-чуть',
		'Таролог готовит расклад на год грядущий, потерпите'
	]

	useEffect(() => {
		const interval = setInterval(() => {
			if (progress < 100) {
				dispatch(setProgress(progress + 1))
			} else {
				setTimeout(() => {
					dispatch(setProgress(0))
					navigate(`/prediction/${randomId}`)
				}, 50)
			}
		}, 100)

		if (trackEnded) dispatch(setTrackEnded(false))

		return () => {
			clearInterval(interval)
		}
	}, [dispatch, navigate, progress, randomId])

	const getCurrentPhrase = () => {
		const index = Math.floor((progress / 100) * progressPhrases.length)
		return progressPhrases[index]
	}

	return (
		<>
			<div className={classes.pharase}>{getCurrentPhrase()}</div>
			<div className={classes.progressContainer}>
				<div
					className={classes.progressBar}
					style={{
						width: `${progress}%`
					}}
				></div>
			</div>
			<div className={classes.persent}>{`${progress}%`}</div>
		</>
	)
}
