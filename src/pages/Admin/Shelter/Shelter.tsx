import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel";
import styles from './Shelter.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useHookFormMask } from "use-mask-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateShelter } from "../../../services/shelter/updateShelter";
import { useQueryClient } from "@tanstack/react-query";



const shelterSchema = z.object({
	name: z
	.string()
	.min(2, { message: 'Nome deve ter no mínimo 2 caracteres.'})
	.max(30, 'Nome deve ter no máximo 30 caracteres.'),
	email: z.string().email('Campo deve ser um email'),
	phone: z.string().refine((value) => {
		const digits = value.replace(/\D/g,'').length
		return digits >= 10 && digits <= 11
	}, 'Numero deve ter entre 10 e 11 caracteres.'),
	whatsapp: z.string().refine((value) => {
		const digits = value.replace(/\D/g,'').length
		return digits >= 10 && digits <= 11
	}, 'Numero deve ter entre 10 e 11 caracteres.')
})

type ShelterSchema = z.infer<typeof shelterSchema>

export function Shelter(){
	const { handleSubmit , register, formState, } = useForm<ShelterSchema>({
		resolver: zodResolver(shelterSchema)
	})

	const registerWithMask = useHookFormMask(register)
	const queryClient = useQueryClient()

	async function submit({ name , email, phone , whatsapp}:ShelterSchema) {
		const toastId = toast.loading('Salvando dados')

		try {
			await updateShelter({
					name,
					email,
					phone: phone.replace(/\D/g,''),
					whatsapp: whatsapp.replace(/\D/g,'')
				})
				queryClient.invalidateQueries({queryKey: ['get-shelter']})
				toast.success('Dados salvos com sucesso', {
					id: toastId,
					closeButton: true,
				})
		} catch (error) {
			toast.error('Não foi possivel salvar os dados', {
				id: toastId,
				closeButton: true,
			})
		}
		console.log(name, email, phone, whatsapp)
	}

	return (
	<Panel>
		<form className={styles.container} onSubmit={handleSubmit(submit)}>
			<div>
				<Input label="Nome" {...register('name')}/>
				{
					formState.errors?.name &&(<p className={styles.formError}>{formState.errors.name.message}</p>
				)}
			</div>
			<div>
				<Input label="Email" {...register('email')}/>
				{
					formState.errors?.email &&(<p className={styles.formError}>{formState.errors.email.message}</p>
				)}
			</div>
			<div>
				<Input label="Telefone" {...registerWithMask('phone', ['99 [9]9999-9999'])}/>
				{
					formState.errors?.phone &&(<p className={styles.formError}>{formState.errors.phone.message}</p>
				)}
			</div>
			<div>
				<Input label="WhatsApp" {...registerWithMask('whatsapp', ['99 [9]9999-9999'])}/>
				{
					formState.errors?.whatsapp &&(<p className={styles.formError}>{formState.errors.whatsapp.message}</p>
				)}
			</div>
			<Button type="submit">Salvar dados</Button>
		</form>
	</Panel>
	)
}