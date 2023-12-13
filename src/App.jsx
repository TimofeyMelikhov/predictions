import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home/Home'
import { Load } from './pages/load/Load'
import { NotFound } from './pages/notFound/NotFound'
import { Prediction } from './pages/prediction/Prediction'

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/loading' element={<Load />} />
				<Route path='/prediction/:id' element={<Prediction />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
