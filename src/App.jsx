import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NotFound } from './pages/NotFound'
import { Prediction } from './pages/Prediction'
import { Home } from './pages/home/Home'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/prediction/:id' element={<Prediction />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
