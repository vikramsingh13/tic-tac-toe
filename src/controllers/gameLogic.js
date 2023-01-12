
//board is a 3x3 matrix
// O is represented by 0
// X is represented by 1
// empty slots are -1
//let board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

//
//also in the code base, if player is human if player===true else ai
//

//checkWin takes current board and a symbol (0 or 1)
//checks if that symbol has won
//if symbol won, returns true else false
const checkWin = (board, symbol) => {
    //checks rows first
    //then cols
    //then diagonals
    if ( (board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol) || 
        (board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol) || 
        (board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol) || 
        (board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol) || 
        (board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol) || 
        (board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol) || 
        (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) || 
        (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
    ){
        return true;
    } else{
        return false;
    }
}

//returns array of empty spots indexes on the board
const getEmptySpots = (board) => {
    let emptySpots = [];

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === -1){
                emptySpots.push([i,j])
            }
        }
    }

    return emptySpots;
}
//takes board
//takes symbol as previous turn's symbol
//takes previous turn's player as true or false
const minmax = (board, symbol, player) => {

    //find the empty spots on the board first
    let emptySpots = getEmptySpots(board);

    //checks if the previous move has won
    //return 1 for ai win to maximize
    //return -1 for player win to minimize
    //return 0 for tie
    if(checkWin(board, symbol)){
        if(player){
            return {score: -1};
        } else{
            return {score: 1};
        }
    } else if(emptySpots.length === 0){
        return {score: 0};
    }

    //keep track of possible moves objects with index and scores
    let moves = [];
    //the best move so far
    let bestMove = 0;
    //flipping symbol and player 'cause it's the next symbol's turn
    symbol = symbol ? 0 : 1;
    player = player ? false : true;
    //bestScore tracks the best possible move
    //if ai, we want the score to be high
    //if human, we want the socre to be low
    let bestScore = player ? Infinity : -Infinity;

    //iterates through the empty spots matrix
    for(let i = 0; i < emptySpots.length; i++){
        //object for current move
        //will hold index and score attributes
        let move = {}

        //save move index
        move.index = [emptySpots[i][0], emptySpots[i][1]];
        //change board spot to symbol
        board[emptySpots[i][0]][emptySpots[i][1]] = symbol;

        //call minmax recursively
        let result = minmax(board, symbol, player);
        //store the score returned to move's score attribute
        move.score = result.score;
        
        //reset the board spot
        board[emptySpots[i][0]][emptySpots[i][1]] = -1;
        //save move object in moves array
        moves.push(move);
    }

    for(let i = 0; i < moves.length; i++){
        if((!player && moves[i].score > bestScore) ||
        (player && moves[i].score < bestScore)){
            bestMove = i;
            bestScore = moves[i].score;
        }
    }

    return moves[bestMove];
}

//takes a 3 x 3 2d array of tiles
//0 == O, 1 == X, -1 == empty tile
//returns the best move for ai
const startGame = (grid) =>{
    //code for testing
    let board = grid;
    let move = minmax(board, 1, true);
    return move;
}

export default startGame;