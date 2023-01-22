import React, {useEffect, useState} from 'react'
import {getBestMove, checkWin} from './controllers/gameLogic'
import Board from './components/Board'
import Selection from './components/Selection'
import DisplayPanel from './components/DisplayPanel'


const App = ()=> {
    //default empty grid
    //grid contains 3 rows of 3 cols, 0 == O, 1 == X, -1 == empty tile
    const defaultGrid = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    //store player symbol selection, by default X represented by 1
    //0 == O, -1 == empty tile
    const [playerSymbol, setPlayerSymbol] = useState(1)
    const [aiSymbol, setAiSymbol] = useState(0)
    // -1 = no winner yet, 0 = O, 1 = X, 2 = tie
    const [winnerSymbol, setWinnerSymbol] = useState(-1)
    //3 stages of difficulty, 0, 1, 2
    //by default 2 with minmax algo, 1 == cpu tries to tie, 0 == random moves
    const [difficulty, setDifficulty] = useState(2)
    //initially set grid to defaultGrid
    const [grid, setGrid] = useState(defaultGrid)
    //gameRunning is true if game is still on
    //false if game has not started or game is over
    const [gameRunning, setGameRunning] = useState(false)
    //stores the number of turns
    const [turnNumber, setTurnNumber] = useState(0)
    

    //game starts when player places their first move
    //game resets if the symbol or difficulty is changed mid game
    //board reset if player clicks on board after the game is over
    const handleBoardClick = async(e) => {
        //get player move and send it to game logic
        //game logic sends back best move for ai
        //starts the game or resets the board is game is over
        if(!gameRunning && turnNumber !== 0){
            //sets winnerSymbol to empty string
            //sets gameRunning to true
            endGame(-1, true)
            clearGrid()
            setTurnNumber(0)
        } else{

            setGameRunning(true)

            //update grid with player symbol
            //e is event.target.attributes from Board.js
            //e is an array [className, row, col, ...]
            let newGrid = grid
            let row = e.getAttribute("row")
            let col = e.getAttribute("col")
            //-1 in the array refers to an empty tile
            if(grid[row][col] === -1){
                newGrid[row][col] = playerSymbol
                //force update grid state with copy 
                setGrid([...newGrid])
                setTurnNumber(turnNumber + 1)

                //check if player has won
                if(checkWin(grid, playerSymbol)){
                    endGame(playerSymbol, false)
                } else if(turnNumber >= 4){
                    //symbol === 2 for tie
                    endGame(2, false)
                } else {
                    
                    //getBestMove takes the grid, symbol, whether it's player or not
                    let bestMove = getBestMove(grid, playerSymbol, true)
                    
                    //getBestMove returns an object with index array
                    //index[0] is row, index[1] is col
                    newGrid[bestMove.index[0]][bestMove.index[1]] = aiSymbol

                    setGrid([...newGrid])
                    setTurnNumber(turnNumber + 1)

                    //check if ai won
                    if(checkWin(grid, aiSymbol)){
                        endGame(aiSymbol, false)
                    }
                }//ends else
            }//ends if with the empty slot
        }//ends if else for game running
    }

    //ends game by settingGameRunning to false
    //setting winner symbol
    const endGame = (symbol, running) => {
        setWinnerSymbol(symbol)
        setGameRunning(running)
    }

    //sets grid tiles to empty spaces
    const clearGrid = () =>{
        setGrid([...defaultGrid])
    }

    return (
        <React.Fragment>
            <Board 
                handleBoardClick={handleBoardClick}
                grid={[...grid]}
            />
            <Selection />
            <DisplayPanel winnerSymbol={winnerSymbol} />
        </React.Fragment>
    )
}

export default App;
