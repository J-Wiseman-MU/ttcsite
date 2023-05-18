import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { save } from '../save';
import { alphanum } from '../alphanum';

function Game({ game }) {
    const [board, setBoard] = useState([game.c0,game.c1,game.c2,game.c3,game.c4,game.c5,game.c6,game.c7,game.c8]);
    const [player, setPlayer] = useState(game.gamescol);
    const [gameName, setGameName] = useState('');
    const navigate = useNavigate();

    const checkWin = (board) => {
        const winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const line of winLines) {
            if (board[line[0]] !== 0 && board[line[0]] === board[line[1]] && board[line[0]] === board[line[2]]) {
                return true;
            }
        }
        return false;
    };

    const handleClick = (index) => {
        if (board[index] === 0) {
            const newBoard = [...board];
            newBoard[index] = player;
            setBoard(newBoard);

            if (checkWin(newBoard)) {
                alert(`Player ${player} wins!`);
            } else {
                setPlayer(player === 1 ? 2 : 1);
            }
        }
    };

    const handleSave = () => {
        const gameState = [
            game.user,
            game.num,
            board[0],
            board[1],
            board[2],
            board[3],
            board[4],
            board[5],
            board[6],
            board[7],
            board[8],
            gameName,
            player
        ];
        if(alphanum(gameName)){
            save(gameState);
        }
    };

    const handleGameNameChange = (event) => {
        setGameName(event.target.value);
    };

    const renderCell = (value, index) => (
        <button
            key={index}
            className={`col-4 border border-dark d-flex justify-content-center align-items-center p-0${index % 3 === 2 ? '' : ' border-right'}`}
            style={{ height: '33.33%' }}
            onClick={() => handleClick(index)}
        >
            <span className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ fontSize: '3rem' }}>
                {value === 1 ? 'X' : value === 2 ? 'O' : ''}
            </span>
        </button>
    );

    return (
        <div className="container">
            <div className="row" style={{ height: '80vh' }}>
                {board.map((value, index) => renderCell(value, index))}
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter game name"
                        value={gameName}
                        onChange={handleGameNameChange}
                    />
                    <button className="btn btn-primary btn-block" onClick={handleSave}>Save</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-danger btn-block" onClick={() => navigate('/lobby')}>Quit</button>
                </div>
            </div>
        </div>
    );
}

export default Game;