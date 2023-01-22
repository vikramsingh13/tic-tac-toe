import React, {useEffect, useState} from 'react'

const DisplayPanel = ({winnerSymbol}) => {
    const [displayMessage, setDisplayMessage] = useState('')
    useEffect(() => {
        if(winnerSymbol === 0){
            setDisplayMessage("O wins!")
        }
        if(winnerSymbol === 1){
            setDisplayMessage("X wins!")
        }
        if(winnerSymbol === 2){
            setDisplayMessage("It's a tie.")
        }
        if(winnerSymbol === -1){
            setDisplayMessage('')
        }
    }, [winnerSymbol])
    return <div>{displayMessage}</div>
}

export default DisplayPanel;