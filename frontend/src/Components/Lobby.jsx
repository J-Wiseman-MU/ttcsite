import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { games } from '../games';

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
        setN('');
        navigate('/');
    }

    const renderBoard = (row, index) => {
        const cells = [row.c0,row.c1,row.c2,row.c3,row.c4,row.c5,row.c6,row.c7,row.c8];

        return (
            <div key={index} className="col-12 col-md-6 mb-3 d-flex justify-content-center">
                <div className="border border-dark p-2 w-100">
                    <div className="d-flex flex-wrap" style={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
                        {cells.map((cell, i) => (
                            <div key={i} className={`d-flex justify-content-center align-items-center ${i % 3 === 2 ? '' : 'border-right'} ${Math.floor(i / 3) === 2 ? '' : 'border-bottom'} border-dark`} style={{ width: '33.33%', height: '0', paddingBottom: '33.33%', position: 'absolute', top: `${Math.floor(i / 3) * 33.33}%`, left: `${(i % 3) * 33.33}%` }}>
                                <span style={{ fontSize: 'calc(2rem + 2vw)', lineHeight: '1', position: 'relative', top: '50%', transform: 'translateY(100%)' }}>
                                    {cell === 1 ? 'X' : cell === 2 ? 'O' : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary btn-block mt-2" onClick={() => navigateToGame(index)}>Start</button>
                </div>
            </div>
        );
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                {rows.map((row, index) => renderBoard(row, index))}
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <button className="btn btn-success btn-block" onClick={() => newGameFunc()}>New Game</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-danger btn-block" onClick={() => lg()}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Lobby;




