import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/common/Header";
import { Grid } from "../../components/layout/Grid";
import styles from './Pets.module.css'
import { Card } from "../../components/common/Card";
import { getPets } from "../../services/pets/getPets";

import { Skeleton } from "../../components/common/Skeleton";


export function Pets(){
	const [pets, setPets] = useState([])
	const [isLoading]

	useEffect(()=> {
		async function loadData() {
			const data = await getPets()
			setPets(data.items)
			
		}
		loadData()
	}, [])
	return (
		<Grid>
			<div className={styles.container}>
				<Header/>
				<main className={styles.list}>
					<Skeleton count={5} containerClassName={styles.skeleton}/>
					{ 	pets.map(pet => (
							< 	key={pet.id}
									href=`/pets/${pet.id}` 
									text={pet.name} 
									thumb={pet.photo}/>
						))
					}
				</main>
				<Link to="/pets/20">Ir para listagem</Link>
			</div>
		</Grid>)
}