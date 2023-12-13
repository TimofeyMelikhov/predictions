import { ProgressBar } from 'src/components/progressbar/ProgressBar'

import classses from './load.module.scss'

export const Load = () => {
	return (
		<div className={classses.load}>
			<div className={classses.load__cat}></div>
			<ProgressBar />
		</div>
	)
}
