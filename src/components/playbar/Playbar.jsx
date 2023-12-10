import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'
import { Slider } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { secondsConverter } from 'src/utils/secondsConverter'

import { updateTime, updateVolume } from '../../store/predictionSlice'

import classes from './palybar.module.scss'

export const Playbar = () => {
	const dispatch = useDispatch()
	const audioRef = useRef(null)
	const { currentTrack, isPlaying, duration, currentTime, currentVolume } =
		useSelector(state => state.predictionSlice)

	const formattedCurrentDuration = secondsConverter(currentTime)
	const formattedDuration = secondsConverter(duration)
	const sliderCurrentTime = Math.round((currentTime / duration) * 100)

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = currentVolume
			if (!isPlaying) {
				audioRef.current.play()
			} else {
				audioRef.current.pause()
			}
		}
		const timeInterval = setInterval(() => {
			dispatch(updateTime(audioRef.current.currentTime))
		}, 1000)
		return () => {
			clearInterval(timeInterval)
		}
	}, [currentTrack, currentVolume, dispatch, isPlaying])

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
						color: '#fff'
					}}
				/>
			</div>
			<div className={classes.time}>
				<div>{formattedCurrentDuration}</div>
				<div>{formattedDuration}</div>
			</div>
			<div className={classes.volume}>
				<VolumeDownOutlinedIcon />
				<Slider
					step={0.01}
					min={0}
					max={1}
					value={currentVolume}
					onChange={handleVolumeChange}
					sx={{
						color: '#fff'
					}}
				/>
				<VolumeUpOutlinedIcon />
			</div>
			<audio ref={audioRef} src={currentTrack?.trackLink} />
		</div>
	)
}
