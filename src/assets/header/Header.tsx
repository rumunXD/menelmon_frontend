import { Link } from '@tanstack/react-router';
import './Header.scss'
import {isAuthenticated} from "../../utils/auth.tsx";

export default function Header() {
    if(isAuthenticated()) {
        return (<header className="bg-gray-100 py-4 px-6 shadow">
            <nav>
                <h1 className="text-xl font-bold">Menelmon</h1>
                <div className="space-x-4">
                    <Link to="/" className="text-blue-600 hover:underline">Strona główna</Link>
                    <Link to="/menu" className="text-blue-600 hover:underline">Menu</Link>
                    <Link to="/logOut" className="text-blue-600 hover:underline">Wyloguj się</Link>
                </div>
            </nav>
        </header>)
    } else {
        return (<header className="bg-gray-100 py-4 px-6 shadow">
            <nav>
                <h1 className="text-xl font-bold">Menelmon</h1>
                <div className="space-x-4">
                    <Link to="/" className="text-blue-600 hover:underline">Strona główna</Link>
                    <Link to="/login" className="text-blue-600 hover:underline">Logowanie</Link>
                    <Link to="/register" className="text-blue-600 hover:underline">Rejestracja</Link>
                </div>
            </nav>
        </header>)
    }
}