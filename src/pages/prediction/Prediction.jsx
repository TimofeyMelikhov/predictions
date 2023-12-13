import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Playbar } from 'src/components/playbar/playbar'

import {
	setCurrentTrack,
	setTrackEnded,
	updateDuration
} from '../../store/predictionSlice'

import classes from './prediction.module.scss'

export const Prediction = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const dispatch = useDispatch()
	const prediction = useSelector(state => state.predictionSlice.predictions)
	const [imageColors, setImageColors] = useState([])
	const [showBlock, setShowBlock] = useState(false)

	const currentPrediction = prediction.find(
		prediction => prediction.id === parseInt(id, 10)
	)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function loadImageColors() {
		const image = new Image()
		image.src = currentPrediction.img

		image.onload = async () => {
			const canvas = document.createElement('canvas')
			canvas.width = image.width
			canvas.height = image.height

			const ctx = canvas.getContext('2d', { willReadFrequently: true })
			ctx.drawImage(image, 0, 0, image.width, image.height)

			// Получение цветов изображения из трех разных точек
			const colors = []
			const points = [
				{ x: image.width / 4, y: image.height / 4 },
				{ x: image.width / 2, y: image.height / 2 },
				{ x: (3 * image.width) / 4, y: (3 * image.height) / 4 }
			]

			points.forEach(point => {
				const pixelColor = ctx.getImageData(point.x, point.y, 1, 1).data
				const hexColor = rgbToHex(pixelColor[0], pixelColor[1], pixelColor[2])
				colors.push(hexColor)
			})

			setImageColors(colors)
		}
	}

	const rgbToHex = (r, g, b) => {
		const toHex = c =>
			('0' + Math.max(0, Math.min(255, c)).toString(16)).slice(-2)
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`
	}

	useEffect(() => {
		loadImageColors()
		dispatch(setCurrentTrack(currentPrediction))
		dispatch(updateDuration(currentPrediction.duration))
	}, [currentPrediction, dispatch])

	const gradientStyle = {
		background: `linear-gradient(249.93deg, ${imageColors.join(', ')})`
	}

	const resetApp = () => {
		navigate('/loading')
		dispatch(setTrackEnded(false))
		setShowBlock(false)
	}

	useEffect(() => {
		const timerId = setInterval(() => {
			setShowBlock(true)
		}, 21000)

		return () => {
			clearInterval(timerId)
		}
	}, [showBlock])

	return (
		<div className={classes.main} style={gradientStyle}>
			{showBlock && (
				<div className={classes.reset}>
					<div className={classes.reset__cat}></div>
					<div className={classes.reset__btn} onClick={resetApp}></div>
				</div>
			)}

			<div className={classes.main__player}>
				<div className={classes.predictionCard}>
					<img src={currentPrediction.img} alt='image current prediction' />
					<div> {prediction.descr} </div>
				</div>

				<div className={classes.trackInfo}>
					<div className={classes.trackInfo__trackName}>
						{currentPrediction.trackName}
					</div>
					<div className={classes.trackInfo__artist}>
						{currentPrediction.artist}
					</div>
				</div>

				<Playbar />
			</div>
		</div>
	)
}
