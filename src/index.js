import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./app.css"
import Menu from "./Menu"
import Game from "./components/Game"



ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Menu />}/>
            <Route path="/game" element={<Game />}/>
        </Routes>
    
    
    </BrowserRouter>
, document.getElementById("root"));

