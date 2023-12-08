import { combineReducers, configureStore } from '@reduxjs/toolkit'

import predictionSlice from './predictionSlice'

const rootReducer = combineReducers({
	predictionSlice
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}
