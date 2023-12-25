import cat from 'src/assets/img/cat.png'
import catMobile from 'src/assets/img/catForMobile.png'
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
					<div>Раздаем</div> <span>песни-предсказания</span> <br /> на новый
					<span> 2024</span>
				</h1>
				<MainButton />
			</div>

			<div className={classes.catAndCopy}>
				{window.innerWidth > 420 && <img src={cat} />}
				{window.innerWidth < 420 && <img src={catMobile} />}
				<div className={classes.copyrigth}>
					© Отдел дистанционного обучения, <br />{' '}
					<div>с любовью к котикам</div>
				</div>
			</div>
		</div>
	)
}
