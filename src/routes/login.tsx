import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import Header from "../assets/header/Header.tsx";

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginRoute() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await axios.post('http://localhost:3000/users/login', data);
            localStorage.setItem('token', res.data.token);
            alert('Zalogowano!');
            navigate({ to: '/' });
        } catch (err: any) {
            alert(err?.response?.data?.error || 'Błąd logowania');
        }
    };

    return (
        <>
            <Header/>
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Logowanie</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        {...register('password', { required: true })}
                        className="border p-2 w-full"
                    />
                    {errors.password && <p className="text-red-500">Hasło jest wymagane</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded">
                    Zaloguj się
                </button>
            </form>
        </div>
        </>
    );
}