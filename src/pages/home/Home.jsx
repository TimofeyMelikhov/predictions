import { MainButton } from '../../components/ui/mainButton/MainButton'

import cat from '../../assets/img/cat.png'
import smalCat from '../../assets/img/smal_cat.png'

import classes from './home.module.scss'

export const Home = () => {
	return (
		<div className={classes.main}>
			<div className={classes.smalCat}>
				<img src={smalCat} />
			</div>

			<div className={classes.cat}>
				<img src={cat} />
			</div>

			<div className={classes.content}>
				<h1 className={classes.content__header}>
					Раздаем <span>песни-предсказания</span> <br /> на новый
					<span> 2024</span>
				</h1>
				<MainButton id={52} />
			</div>

			{/* <div className={classes.copyrigth}>
				© Отдел дистанционного обучения, <br />{' '}
				<span>с любовью к котикам</span>
			</div> */}
		</div>
	)
}
