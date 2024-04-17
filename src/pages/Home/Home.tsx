import { Button, ButtonVariant } from "../../components/common/Button"
import { Link } from 'react-router-dom'
import dog from '../../assets/dog.svg'
import styles from './Home.module.css'


export function Home(){
	return (
		<div className={styles.container}>
			<div className={styles.imagemHome}>
				<img src={dog} alt="Dog" width="278px" />
			</div>
			<Link to='/pets'>
				<Button variant = {ButtonVariant.Default} >Quero adotar</Button>
			</Link>
			<Link to='/admin'>
				<Button variant={ButtonVariant.Outlined} >Tenho um abrigo</Button>
			</Link>
		</div>
	)
}