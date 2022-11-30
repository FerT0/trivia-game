import React from "react"
import { useNavigate } from "react-router"
import {Animated} from "react-animated-css";


export default function App() {
    const navigate = useNavigate();
    const startGameEasy = () =>{
        navigate("/game", {state: {difficult: "easy"}})
    }
    const startGameMedium = () =>{
        navigate("/game", {state: {difficult: "medium"}})
    }
    const startGameHard = () =>{
        navigate("/game", {state: {difficult: "hard"}})
    }

    
    return (
        <div className="menu-mainContent">
            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                <div className="menu-header">
                    <h1 className="menu-title">Trivia</h1>
                    <h1 className="menu-subTitle">Time!</h1>
                </div>
            </Animated>
            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                <div className="menu-buttons">
                    <button className="easy-button" onClick={startGameEasy}>Easy</button>
                    <button className="medium-button" onClick={startGameMedium}>Medium</button>
                    <button className="hard-button" onClick={startGameHard}>Hard</button>
                </div>
            </Animated>
        </div>
    )
}
