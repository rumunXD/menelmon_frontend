import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from '@tanstack/react-router'
import Header from "../assets/header/Header.tsx";

type RegisterFormData = {
    name: string
    email: string
    password: string
}

export default function RegisterRoute() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()
    const navigate = useNavigate()

    const onSubmit = async (data: RegisterFormData) => {
        try {

            await axios.post('http://localhost:3000/users/register', data)
            alert('Rejestracja zakończona. Możesz się teraz zalogować.')
            navigate({ to: '/login' })
        } catch (err: any) {
            alert(err?.response?.data?.error || 'Błąd rejestracji')
        }
    }

    return (
        <>
            <Header/>
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Rejestracja</h2>
            <form onSubmit={handleSubmit(onSubmit)} method="post" className="space-y-4">
                <div>
                    <label>Nick:</label>
                    <input
                        {...register('name', { required: true })}
                        className="border p-2 w-full"
                    />
                    {errors.name && <p className="text-red-500">Nick jest wymagany</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="border p-2 w-full"
                    />
                    {errors.email && <p className="text-red-500">Email jest wymagany</p>}
                </div>
                <div>
                    <label>Hasło:</label>
                    <input
                        type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        className="border p-2 w-full"
                    />
                    {errors.password && (
                        <p className="text-red-500">Hasło musi mieć min. 6 znaków</p>
                    )}
                </div>
                <button type="submit" className="bg-green-600 text-black px-4 py-2 rounded">
                    Zarejestruj się
                </button>
            </form>
        </div>
        </>
    )
}
