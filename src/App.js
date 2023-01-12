import React, {useEffect, useState} from 'react';
import startGame from './controllers/gameLogic';
import Board from './components/Board';
import Selection from './components/Selection';


const App = ()=> {
    //default empty grid
    //grid contains 3 rows of 3 cols, 0 == O, 1 == X, -1 == empty tile
    const defaultGrid = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    //store player symbol selection, by default X represented by 1
    //0 == O, -1 == empty tile
    const [playerSymbol, setPlayerSymbol] = useState(1);
    //3 stages of difficulty, 0, 1, 2
    //by default 2 with minmax algo, 1 == cpu tries to tie, 0 == random moves
    const [difficulty, setDifficulty] = useState(2);
    //initially set grid to defaultGrid
    const [grid, setGrid] = useState(defaultGrid);
    //gameRunning is true if game is still on
    //false if game has not started or game is over
    const [gameRunning, setGameRunning] = useState(false);
    

    //game starts when player places their first move
    //game resets if the symbol or difficulty is changed mid game
    //board reset if player clicks on board after the game is over
    const handleBoardClick = (e) => {
        //get player move and send it to game logic
        //game logic sends back best move for ai
        //starts the game or resets the board is game is over
        if(!gameRunning){
            setGameRunning(true);
            clearGrid();
        }

        //update grid with player symbol
        //e is event.target.attributes from Board.js
        //e is an array [className, row, col, ...]
        let newGrid = grid;
        let row = e.getAttribute("row");
        let col = e.getAttribute("col");
        if(grid[row][col] !== playerSymbol){
            newGrid[row][col] = playerSymbol;
            //force update grid state with copy 
            setGrid([...newGrid]);
        }
    }

    //sets grid tiles to empty spaces
    const clearGrid = () =>{
        setGrid([...defaultGrid]);
    }

    return (
        <React.Fragment>
            <Board 
                handleBoardClick={handleBoardClick}
                grid={[...grid]}
            />
            <Selection />
        </React.Fragment>
    )
}

export default App;
