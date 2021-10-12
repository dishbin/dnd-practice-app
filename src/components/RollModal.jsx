import React, { useState } from 'react';
import '../styles/roll-modal.css'

function RollModal({setRollModal}) {

    const defaultRollState = {
        type: 20,
        amount: 1
    }

    const [fist, setFist] = useState(defaultRollState);
    const [results, setResults] = useState(null);

    const handleChange = (e) => {
        setFist({...fist, [e.target.id]: e.target.value});
    }

    const roll = (type, amount) => {
        console.log(fist)
        let rolls = [];
        for (let i = 0; i < fist.amount; i++) {
            rolls.push(Math.ceil(Math.random() * fist.type));
        }
        console.log(rolls)
        setResults(rolls);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <h4>select die</h4>
                <select id='type' className='die-select' onChange={handleChange}>
                    <option value={4} >D4</option>
                    <option value={6} >D6</option>
                    <option value={8} >D8</option>
                    <option value={10} >D10</option>
                    <option value={12} >D12</option>
                    <option value={20} >D20</option>
                </select>
                <h4>enter dice amount</h4>
                <input id='amount' type='number' placeholder='dice amount' min='1' onChange={handleChange} />
                <div className='results'>
                    {(results) && 
                        results.map(roll => {
                            return <h1 key={results.indexOf(roll)}>{roll}</h1>
                        })
                    }
                </div>
                <div>
                    <button type='button' onClick={roll}>roll</button>
                    <button type='button' onClick={() => setRollModal(false)} >close</button>
                </div>
            </div>
        </div>
    );
}

export default RollModal;