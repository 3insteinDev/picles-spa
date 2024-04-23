import { IPet } from "../../interfaces/pet";
import httpClient from "../api/httpClient";

export async function getPetById(id: string): Promise<IPet>{
	try{
		const response = await httpClient(`/pet/${id}`)
		return response.data
	}catch(error){
		console.log('Erro ao buscar Pet por id', error)
		throw error
	}
}