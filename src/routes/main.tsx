import Header from "../assets/header/Header.tsx";
import "./main.scss"

export default function MainRoute(){
    return (<>
        <Header/>
        <div id={"about"}>
            <h2>O grze</h2>
            <p>Nie jest to wybitne, ale tak, gra podobna do pokemonów.</p>
        </div>
    </>)
}