import { Pause, PlayArrow } from '@mui/icons-material'
import { IconButton, Slider } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { secondsConverter } from 'src/utils/secondsConverter'

import {
	setPlaying,
	setTrackEnded,
	updateTime,
	updateVolume
} from '../../store/predictionSlice'

import classes from './palybar.module.scss'

export const Playbar = () => {
	const dispatch = useDispatch()
	const audioRef = useRef(null)
	const { currentTrack, isPlaying, duration, currentTime, currentVolume } =
		useSelector(state => state.predictionSlice)
	const [isVolumeSliderVisible, setVolumeSliderVisible] = useState(false)

	const formattedCurrentDuration = secondsConverter(currentTime)
	const formattedDuration = secondsConverter(duration)
	const sliderCurrentTime = Math.round((currentTime / duration) * 100)

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = currentVolume
			if (isPlaying) {
				audioRef.current.play()
			}
		}
	}, [currentTrack, currentVolume, dispatch, isPlaying])

	useEffect(() => {
		audioRef.current.addEventListener('ended', () => {
			dispatch(setTrackEnded(true))
		})
	}, [])

	const handleChangeCurrentTime = (_, value) => {
		const time = Math.round((value / 100) * duration)
		dispatch(updateTime(time))
		audioRef.current.currentTime = time
	}
	const handleVolumeChange = (_, value) => {
		let volume = (audioRef.current.volume = value)
		dispatch(updateVolume(volume))
		audioRef.current.volume = currentVolume
	}

	const timeUpdate = () => {
		dispatch(updateTime(audioRef.current.currentTime))
	}

	const handleToggleAudio = () => {
		if (isPlaying) {
			dispatch(setPlaying(false))
			audioRef.current.pause()
		} else {
			dispatch(setPlaying(true))
			audioRef.current.play()
		}
	}

	return (
		<div className={classes.main}>
			<div className={classes.slider}>
				<Slider
					step={1}
					min={0}
					max={100}
					value={sliderCurrentTime}
					onChange={handleChangeCurrentTime}
					sx={{
						color: '#fff',
						'.css-eg0mwd-MuiSlider-thumb:hover': {
							boxShadow: 'none'
						}
					}}
				/>
			</div>
			<div className={classes.time}>
				<div className={classes.time_icon}>
					<IconButton
						onClick={handleToggleAudio}
						sx={{
							'.css-1dttucw-MuiButtonBase-root-MuiIconButton-root:hover': {
								backgroundColor: 'transparent'
							}
						}}
					>
						{isPlaying ? (
							<Pause
								sx={{
									color: '#fff'
								}}
							/>
						) : (
							<PlayArrow
								sx={{
									color: '#fff'
								}}
							/>
						)}
					</IconButton>
					<div
						className={classes.volumeContainer}
						onMouseEnter={() => setVolumeSliderVisible(true)}
						onMouseLeave={() => setVolumeSliderVisible(false)}
					>
						{currentVolume === 0 ? (
							<div className={classes.volume_mute}></div>
						) : (
							<div className={classes.volume}></div>
						)}

						{isVolumeSliderVisible && (
							<div className={classes.volume_bar}>
								<Slider
									step={0.01}
									min={0}
									max={1}
									value={currentVolume}
									onChange={handleVolumeChange}
									sx={{
										color: '#fff',
										'.css-eg0mwd-MuiSlider-thumb:hover': {
											boxShadow: 'none'
										}
									}}
								/>
							</div>
						)}
					</div>
					<div>{formattedCurrentDuration}</div>
				</div>
				<div>{formattedDuration}</div>
			</div>

			<audio
				ref={audioRef}
				src={currentTrack?.trackLink}
				onTimeUpdate={timeUpdate}
			/>
		</div>
	)
}
