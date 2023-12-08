import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { secondsConverter } from 'src/utils/secondsConverter'

import { Playbar } from 'src/components/playbar/playbar'

import classes from './prediction.module.scss'

export const Prediction = () => {
	const { id } = useParams()
	const prediction = useSelector(state => state.predictionSlice.predictions)
	const isPlaying = useSelector(state => state.predictionSlice.isPlaying)
	const audioRef = useRef(null)
	const dispatch = useDispatch()

	const currentPrediction = prediction.find(
		prediction => prediction.id === parseInt(id, 10)
	)

	const formattedDuration = secondsConverter(currentPrediction.duration)

	useEffect(() => {
		if (currentPrediction && currentPrediction.trackLink) {
			audioRef.current.play()
		}
		console.log(isPlaying)
	}, [currentPrediction])

	return (
		<div className={classes.main}>
			<Link to='/'>Назад</Link>

			<div className={classes.predictionCard}>
				<img src={currentPrediction.img} alt='' />
			</div>
			<div> {currentPrediction.descr} </div>
			<div> {currentPrediction.artist} </div>
			<div> {currentPrediction.trackName} </div>
			<div> {formattedDuration} </div>
			<Playbar />
		</div>
	)
}
