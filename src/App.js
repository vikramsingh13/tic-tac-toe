import React from 'react';
import startGame from './controllers/gameLogic';


const App = ()=> {
    //test logic
    startGame();

    return (
        <React.Fragment>
            <h1>Tic-tac-toe</h1>
        </React.Fragment>
    )
}

export default App;
