import cat from 'src/assets/img/cat.png'
import smalCat from 'src/assets/img/smal_cat.png'

import { MainButton } from 'src/components/ui/mainButton/MainButton'

import classes from './home.module.scss'

export const Home = () => {
	return (
		<div className={classes.main}>
			<div className={classes.smalCat}>
				<img src={smalCat} />
			</div>

			<div className={classes.content}>
				<h1 className={classes.content__header}>
					Раздаем <span>песни-предсказания</span> <br /> на новый
					<span> 2024</span>
				</h1>
				<MainButton />
			</div>

			<div className={classes.catAndCopy}>
				<img src={cat} />
				<div className={classes.copyrigth}>
					© Отдел дистанционного обучения, <br />{' '}
					<div>с любовью к котикам</div>
				</div>
			</div>
		</div>
	)
}
