import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'
import { Link } from '@tanstack/react-router';
import Header from "../assets/header/Header.tsx";

export default function MenuRoute() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
            alert('Musisz być zalogowany, aby zobaczyć menu.')
            navigate({ to: '/login' })
        }
    }, [])

    return (
        <>
            <Header/>
            <div className="flex justify-center items-center flex-col mt-10">
                <button style={{width: '20%'}} className="mb-3"><Link to="/gameLoader" style={{color: 'black'}} className="text-black hover:underline">Zagraj</Link></button>
                <button style={{width: '20%'}}><Link to="/gameHistory" style={{color: 'black'}} className="text-black hover:underline">Historia gier</Link></button>
            </div>
        </>
    )
}