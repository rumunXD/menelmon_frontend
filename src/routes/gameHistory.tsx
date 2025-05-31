import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'
import axios from "axios";
import Header from "../assets/header/Header.tsx";
import HistoryTable from "../assets/historyTable/HistoryTable.tsx";

export default function GameHistoryRoute() {
    const navigate = useNavigate()

    const [history, setHistory] = useState([])

    useEffect(() => {
        if (!isAuthenticated()) {
            alert('Musisz być zalogowany, aby zobaczyć historie.')
            navigate({ to: '/login' })
        }
        const initialize = async() => {
            try {
                const token = localStorage.getItem('token')
                const data = await axios.get('http://localhost:3000/game/history',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                //localStorage.setItem('game_history', JSON.stringify( data.data ));
                setHistory(data.data);

            } catch (err: any) {
                alert(err?.response?.data?.error || 'Nie można sprawdzić histori gier')
                navigate({to: '/menu'})
            }
        }
        initialize()
    }, [])



    return (
        <>
            <Header/>
            <HistoryTable data={history}/>
        </>
    )
}