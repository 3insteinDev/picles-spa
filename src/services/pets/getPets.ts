import { GetPetsRequest, GetPetsResponse } from '../../interfaces/pet'
import httpClient from '../api/httpClient'

export async function getPets(params?: GetPetsRequest): Promise<GetPetsResponse>{
	try{
		const reponse = await httpClient.get('/pets', {params})
		return reponse.data
	}catch(error){
		console.log('Erro ao buscar pets', error)
		throw error
	}
}