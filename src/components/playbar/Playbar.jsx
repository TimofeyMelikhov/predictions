import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	setCurrentTrack,
	updateDuration,
	updateTime
} from '../../store/predictionSlice'

export const Playbar = () => {
	const dispatch = useDispatch()
	const { currentTrack, isPlaying, currentTime, duration } = useSelector(
		state => state.predictionSlice
	)
	const audioRef = useRef(null)

	useEffect(() => {
		if (audioRef.current) {
			// Управление воспроизведением, обновлением времени и длительности
			if (isPlaying) {
				audioRef.current.play()
			} else {
				audioRef.current.pause()
			}
		}
	}, [isPlaying])

	const handleTimeUpdate = () => {
		dispatch(updateTime(audioRef.current.currentTime))
	}

	const handleDurationChange = () => {
		dispatch(updateDuration(audioRef.current.duration))
	}

	return (
		<div>
			<div>
				{currentTime} — {duration}
			</div>

			<audio
				ref={audioRef}
				src={currentTrack}
				onTimeUpdate={handleTimeUpdate}
				onDurationChange={handleDurationChange}
			/>
		</div>
	)
}
