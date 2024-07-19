import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CreateAccount from './Components/CreateAccount'
import Lobby from './Components/Lobby'
import Game from './Components/Game'
import Login from './Components/Login'
import React,  { useState }  from 'react';

function App() {
	const [user, setUser] = useState('')
	const [g, setG] = useState(null)
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/" element={<Login setU = {setUser}/>}/>
					<Route exact path="/createaccount" element={<CreateAccount/>}/>
					<Route exact path="/lobby" element={<Lobby name={user} setGame={setG} setN={setUser}/>}/>
					<Route exact path="/game" element={<Game game={g}/>}/>
				</Routes>
			</div>
		</Router>
	)
}

export default App;
