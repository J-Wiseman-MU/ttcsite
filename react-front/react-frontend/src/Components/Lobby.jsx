import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { games } from '../games';
import './Lobby.css';

const Lobby = ({ name, setGame, setN }) => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGame = async () => {
            const response = await games(name);
            setRows(response);
        };

        fetchGame();
    }, [name]);

    const navigateToGame = (index) => {
        setGame(rows[index]);
        navigate('/game');
    };

    const newGameFunc = () => {
        const gameState = {
            c0: 0, c1: 0, c2: 0,
            c3: 0, c4: 0, c5: 0,
            c6: 0, c7: 0, c8: 0,
            gameName: '',
            user: name,
            num: rows.length + 1,
            gamescol: 1
        };setGame(gameState);
        navigate('/game')
    }

    const lg = () => {
	document.cookie.split(";").forEach(function(c) { 
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
	});
        setN('');
        navigate('/');
    }

    const renderBoard = (row, index) => {
        const cells = [row.c0,row.c1,row.c2,row.c3,row.c4,row.c5,row.c6,row.c7,row.c8];

        return (
            <div key={index} className="game-item">
                <div className="game-board">
                        {cells.map((cell, i) => (
                            <div key={i} className="game-cell">
                                {cell === 1 ? 'X' : cell === 2 ? 'O' : ''}
                            </div>
                        ))}
		</div>
		<div className="game-info">
		    <span className="game-name">{row.gameName || `Game ${row.num}`}</span>
                    <button className="btn btn-primary start-button" onClick={() => navigateToGame(index)}>Start</button>
		</div>
            </div>
        );
    };

    return (
        <div className="lobby-container">
            <div className="game-list">
                {rows.map((row, index) => renderBoard(row, index))}
            </div>
            <div className="lobby-menu">
                <button className="btn btn-success menu-button" onClick={() => newGameFunc()}>New Game</button>
                <button className="btn btn-danger menu-button" onClick={() => lg()}>Logout</button>
            </div>
        </div>
    );
};

export default Lobby;


