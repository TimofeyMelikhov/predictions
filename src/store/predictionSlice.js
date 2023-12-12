import { createSlice } from '@reduxjs/toolkit'

import { predictions } from './predictionData'

const predictionSlice = createSlice({
	name: 'prediction',
	initialState: {
		predictions,
		currentTrack: null,
		isPlaying: true,
		currentTime: 0,
		duration: 0,
		currentVolume: 0.5,
		trackEnded: false
	},
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload
		},
		updateTime: (state, action) => {
			state.currentTime = action.payload
		},
		updateDuration: (state, action) => {
			state.duration = action.payload
		},
		setPlaying: (state, action) => {
			state.isPlaying = action.payload
		},
		updateVolume: (state, action) => {
			state.currentVolume = action.payload
		},
		setTrackEnded: (state, action) => {
			state.trackEnded = action.payload
		}
	}
})

export const {
	setCurrentTrack,
	updateTime,
	updateDuration,
	setPlaying,
	updateVolume,
	setTrackEnded
} = predictionSlice.actions
export default predictionSlice.reducer
