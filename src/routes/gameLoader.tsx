import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'
import axios from "axios";
import Header from "../assets/header/Header.tsx";

export default function GameLoaderRoute() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
            alert('Musisz być zalogowany, aby zagrać.')
            navigate({ to: '/login' })
        }
        const initialize = async() => {
            try {
                const token = localStorage.getItem('token')
                const data = await axios.get('http://localhost:3000/game/initialize',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                localStorage.setItem('game_data', JSON.stringify( data ));
                navigate({ to: '/game' })
            } catch (err: any) {
                alert(err?.response?.data?.error || 'Nie można rozpocząć gry')
                navigate({to: '/menu'})
            }
        }
        initialize()
    }, [])



    return (
        <>
            <Header/>
            <div>
                <p>Ładowanie...</p>
            </div>
        </>
    )
}