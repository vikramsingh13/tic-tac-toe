import React, { useEffect, useState } from 'react';
import './Board.css';

const Board = ({handleBoardClick, grid}) => {
    const [gameBoard, setGameBoard] = useState(grid);
    useEffect(() => {
        grid = grid.map((row,i) => {
            row = row.map((col, j) => {
                if(col < 0){
                    col = " "
                } else if(col > 0){
                    col = "X"
                } else {
                    col = "O"
                }
                return <div className='board-col' row={i} col={j} key={i*10 + j}>
                        {col}
                    </div>
            });
            return <div className='board-row' row={i} key={i}>{row}</div>
        });

        setGameBoard(grid);
    },[grid]);

    return (
        <div className='board-container'>
            <div className='board-grid' onClick={(e) => handleBoardClick(e.target)}>
                {gameBoard}
            </div>
        </div>
    );
};

export default Board;