import GenerateQuestions from "./GenerateQuestions"
import ExportQuestions from "./ExportQuestions"
import React from "react"
import {useLocation} from "react-router-dom"
import {Animated} from "react-animated-css";

import "../app.css"
var qIndex = 0

let qConfig = ExportQuestions.data.questions
let countDownSpeed = 999999999
let heart1, heart2, heart3
let updatingCorrect = false, updatingWrong = false
let scoreBoardUpdate
let order
let scoreBoardUpdateShow
let popupMessage = "Answer all the questions as quickly as possible! Remember that you only have 3 lives. Be careful and don't run out of time!"
let popupButtonValue = "START"
let gameFinished = false


const STATUS = {
    pause: 0,
    start: 1,
    default: 2
}

export default function Game () {


    const [aQuestion, setAQuestion] = React.useState("Question!")
    const [aOption1, setAOption1] = React.useState("A")
    const [aOption2, setAOption2] = React.useState("B")
    const [aOption3, setAOption3] = React.useState("C")
    const [aOption4, setAOption4] = React.useState("D")
    const [scoreboard, setScoreboard] = React.useState("0")
    const [lifes, setLifes] = React.useState(3)
    const [seconds, setSeconds] = React.useState(10000);
    const [status, setStatus] = React.useState(STATUS.default);
    const intervalRef = React.useRef();
    const [isPopupVisible, setIsPopupVisible] = React.useState(true)


    const handlePopup = () => {
        if (isPopupVisible === true){
            setIsPopupVisible.apply(false);

        } else {
            setIsPopupVisible(true)
        }
    }


    function countDown(){
        if (seconds !== 0) {
            setSeconds(sec => sec - 1);
        }
      }


      React.useEffect(() => {
        if(status === STATUS.start){
          intervalRef.current = setInterval(() => {
            countDown()
          }, countDownSpeed);
        } else if(status === STATUS.pause && intervalRef.current){
          clearInterval(intervalRef.current)
        }
        return () => {
          clearInterval(intervalRef.current)
        };
      }, [seconds, status]);

  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
  const start = () => setStatus(STATUS.start);
  const stop = () => {
    setStatus(STATUS.pause);
    setSeconds(1000);
  }
    
    
    
    const location = useLocation();
    let difficult = "easy"
    try {
        difficult = location.state.difficult
      } catch (error) {
        console.log("error");
    }
    if (difficult === "easy"){
        qConfig = ExportQuestions.data.questions.easy
        countDownSpeed = 7
    } else if (difficult === "medium") {
        qConfig = ExportQuestions.data.questions.medium
        countDownSpeed = 6
    } else {
        qConfig = ExportQuestions.data.questions.hard
        countDownSpeed = 5
    }
    
        
    const changeQuestion = async () =>{
        if (qIndex < 9){
            qIndex ++;
            setAQuestion(qConfig[order[qIndex]].question)
            setAOption1(qConfig[order[qIndex]].option1)
            setAOption2(qConfig[order[qIndex]].option2)
            setAOption3(qConfig[order[qIndex]].option3)
            setAOption4(qConfig[order[qIndex]].option4)
            stop()
            start()
        } else {
            popupMessage = "Game finished! You made it with " + lifes + " lives!"
            popupButtonValue = "MENU"
            gameFinished = true
            setLifes(3)
            stop()
            handlePopup()
            
        }

    }

    const popupButtonAction = () => {
        if (gameFinished === false) {
            order = generate()
            setLifes(3)
            handlePopup()
            changeQuestion()
            

        } else {
            window.location.href="/"
            
        }
        
    }

    


    
    function checkAnswer(givenAnswer) {
        if (givenAnswer === qConfig[order[qIndex]].answer){
            scoreBoardUpdate = seconds * 1
            scoreBoardUpdateShow = String("+" + scoreBoardUpdate)
            setScoreboard(Number(scoreboard) + scoreBoardUpdate)
            updateScoreboardAnimCorrect()
            setTimeout(changeQuestion(), 1000)
        } else {
            if (lifes === 3){
                heart3 = false
                setLifes(lifes - 1)
            } else if (lifes === 2){
                heart2 = false
                setLifes(lifes - 1)
            } else {
                heart1 = false
                setLifes(lifes - 1)
            }
            setLifes(lifes - 1)
            if (Number(scoreboard) - 10 >= 0){
                setScoreboard(Number(scoreboard) - 200)
                scoreBoardUpdateShow = "-200"
                updateScoreboardAnimWrong()
                updatingWrong = true
                
            }
            changeQuestion()
        }
        
    }


    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const updateScoreboardAnimCorrect = async () => {
        updatingCorrect = true
        await timeout(1000);
        updatingCorrect = false
    }

    const updateScoreboardAnimWrong = async () => {
        updatingWrong = true
        await timeout(1000);
        updatingWrong = false
    }


    if (seconds === 0){
        if (lifes === 3){
            heart3 = false
            setLifes(lifes - 1)
        } else if (lifes === 2){
            heart2 = false
            setLifes(lifes - 1)
        } else {
            heart1 = false
            setLifes(lifes - 1)
        }
        setLifes(lifes - 1)
        if (Number(scoreboard) - 10 >= 0){
            setScoreboard(Number(scoreboard) - 200)
            scoreBoardUpdateShow = "-200"
            updateScoreboardAnimWrong()
            updatingWrong = true
            
        }
        changeQuestion()
    } else if (lifes === 0){
        handlePopup()
        popupMessage = "You ran out of lives!"
        popupButtonValue = "MENU"
        gameFinished = true
        setLifes(3)
        stop()
        
    }

    return (
        
        
        
        <div className="game-mainContent">
            {isPopupVisible && <div>
                <div className="popup-bg"></div>
                <div className="popup">
                        <h2 className="popup-message">{popupMessage}</h2>
                        <button onClick={() => popupButtonAction()} className="startButton">{popupButtonValue}</button>
                    
                </div>
            </div>}

            
            <Animated animationIn="fadeInDown" animationOut="fadeOutDown" isVisible={true}>
                    <div className="scoreboard">
                    <h2 className="scoreboardNum">{scoreboard}</h2>
                    <Animated animationIn="tada" animationOut="fadeOutDown" isVisible={updatingCorrect}><h3 className="scoreboardAdd">{scoreBoardUpdateShow}</h3></Animated>
                    <Animated animationIn="tada" animationOut="fadeOutDown" isVisible={updatingWrong}><h3 className="scoreboardWrong">{scoreBoardUpdateShow}</h3></Animated>
                    </div>
            </Animated>
            <div className="game-header">
                <Animated animationIn="fadeInDown" animationOut="fadeOutDown" isVisible={heart1}><i className="fa-solid fa-heart"></i></Animated>
                <Animated animationIn="fadeInDown" animationOut="fadeOutDown" isVisible={heart2}><i className="fa-solid fa-heart"></i></Animated>
                <Animated animationIn="fadeInDown" animationOut="fadeOutDown" isVisible={heart3}><i className="fa-solid fa-heart"></i></Animated>
            </div>
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                <div className="game-questionContainer">
                    <h1 className="game-question">{aQuestion}</h1>
                </div>
                <div className="game-options">
                    <button onClick={() => checkAnswer(aOption1)} className="option1">{aOption1}</button>
                    <button onClick={() => checkAnswer(aOption2)} className="option2">{aOption2}</button>
                    <button onClick={() => checkAnswer(aOption3)} className="option3">{aOption3}</button>
                    <button onClick={() => checkAnswer(aOption4)} className="option4">{aOption4}</button>
                </div>
                </Animated>
                <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                    <progress id="file" max="1000" value={timerSeconds}></progress>
                </Animated>
            
            
        </div>

    )
}

function generate () {
    let order = GenerateQuestions()
    return order

}





















