import { combineReducers, configureStore } from '@reduxjs/toolkit'

import predictionSlice from './predictionSlice'
import progressSlice from './progressSlice'

const rootReducer = combineReducers({
	predictionSlice,
	progressSlice
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}
