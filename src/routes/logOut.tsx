import React, { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'
import Header from "../assets/header/Header.tsx";

export default function LogOutRoute() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate({ to: '/login' })
        }
        const initialize = async() => {
            try {
                localStorage.removeItem('token')
                if(localStorage.getItem('game_data') != null) localStorage.removeItem('game_data')
                navigate({ to: '/' })
            } catch (err: any) {
                alert(err?.response?.data?.error || 'Jakiś błąd idk')
                navigate({to: '/'})
            }
        }
        initialize()
    }, [])



    return (
        <>
            <Header/>
            <div>
                <p>Wylogowywanie...</p>
            </div>
        </>
    )
}