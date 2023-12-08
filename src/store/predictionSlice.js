import { createSlice } from '@reduxjs/toolkit'

import { predictions } from './predictionData'

const predictionSlice = createSlice({
	name: 'prediction',
	initialState: {
		predictions,
		currentTrack: null,
		isPlaying: false,
		currentTime: 0,
		duration: 0
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
		}
	}
})

export const { setCurrentTrack, updateTime, updateDuration } =
	predictionSlice.actions
export default predictionSlice.reducer
