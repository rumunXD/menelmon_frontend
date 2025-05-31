import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'
import axios from "axios";
import player from '../assets/imgs/cyraxx.png'
import bot from '../assets/imgs/larson.png'
import background from '../assets/imgs/background.png'
import Header from "../assets/header/Header.tsx";
import "./game.scss"

export default function GameRoute() {
    const navigate = useNavigate()

    const [botHp, setBotHp] = useState(100)
    const [playerHp, setPlayerHp] = useState(100)
    const [action, setAction] = useState("Zaatakuj którymś z ataków:")

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            alert('Musisz być zalogowany, aby zagrać.')
            navigate({ to: '/login' })
        }
    }, [])

    const data = JSON.parse( localStorage.getItem('game_data') as string ).data

    const attacks = ["Z Butelki", "Wykitowanie", "Małpeczka", "Idziemy na jednego"]

    const move = async (moveNum: number) => {
        const res = await axios.post('http://localhost:3000/game/move', {
            gameID: data.gameID,
            move: moveNum
        }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
        const temp_data = res.data
        console.log(temp_data)
        let won = false
        let ended = false
        if(temp_data.wasFirstFaster){
            setAction("Użyłeś " + attacks[moveNum])
            setBotHp(temp_data.players.bot.hp < 0 ? 0 : temp_data.players.bot.hp)
            if(temp_data.players.bot.hp > 0){
                await delay(1000).then(() => {
                    setAction("Bot zaatakował")
                    setPlayerHp(temp_data.players.player.hp < 0 ? 0 : temp_data.players.player.hp)
                    if(playerHp === 0){
                        ended = true
                        won = false
                    }
                })
            }
            else {
                ended = true
                won = true
            }

        } else {
            setAction("Bot zaatakował")
            setPlayerHp(temp_data.players.player.hp < 0 ? 0 : temp_data.players.player.hp)
            if(temp_data.players.player.hp > 0){
                await delay(1000).then(() => {
                    setAction("Użyłeś " + attacks[moveNum])
                    setBotHp(temp_data.players.bot.hp < 0 ? 0 : temp_data.players.bot.hp)
                    if(botHp === 0){
                        ended = true
                        won = true
                    }
                })
            }
            else {
                ended = true
                won = false
            }

        }
        await delay(2000).then(async () => {
            if(ended){
                if(won){
                    setAction("Wygrałeś!")
                } else {
                    setAction("Przegrałeś!")
                }
                await delay(1000).then(() => {
                    navigate({to: '/menu'})
                })
            } else{
                setAction("Zaatakuj którymś z ataków:")
            }

        })
    }

    const btn1 = async () => {
        await move(0)
    }
    const btn2 = async () => {
        await move(1)
    }
    const btn3 = async () => {
        await move(2)
    }
    const btn4 = async () => {
        await move(3)
    }

    return (
        <>
            <Header/>
            <div style={{
                backgroundImage: `url(${background})`,
                position: 'absolute',
                width: '100%',
                height: '90%',
                marginTop: '1px'
            }}>
                <div id={"bot"}>
                    <p>hp: {botHp}</p>
                    <div id={"healthBar"}>
                        <div style={{
                            width: botHp + '%',
                            borderTopRightRadius: botHp > 90 ? '9px' : 'none',
                            borderBottomRightRadius: botHp > 90 ? '9px' : 'none',
                            backgroundColor: botHp > 50 ? 'darkgreen' : 'yellow',
                            color: botHp > 50 ? 'darkgreen' : 'yellow'
                        }}>
                            -
                        </div>
                    </div>
                    <img src={bot} alt="bot"/>
                </div>
                <div id={"player"}>
                    <p>hp: {playerHp}</p>
                    <div id={"healthBar"}>
                        <div style={{
                            width: playerHp + '%',
                            borderTopRightRadius: playerHp > 90 ? '9px' : 'none',
                            borderBottomRightRadius: playerHp > 90 ? '9px' : 'none',
                            backgroundColor: playerHp > 50 ? 'darkgreen' : 'yellow',
                            color: playerHp > 50 ? 'darkgreen' : 'yellow'
                        }}>
                            -
                        </div>
                    </div>
                    <img src={player} alt="player"/>
                    <ul>
                        <li>
                            <button onClick={btn1}>Z butelki</button>
                        </li>
                        <li>
                            <button onClick={btn2}>Wykitowanie</button>
                        </li>
                        <li>
                            <button onClick={btn3}>Małpeczka</button>
                        </li>
                        <li>
                            <button onClick={btn4}>Idziemy na jednego</button>
                        </li>
                    </ul>
                </div>
                <div id={"action-box"}>
                    <p>{action}</p>
                </div>
            </div>
        </>
    )
}