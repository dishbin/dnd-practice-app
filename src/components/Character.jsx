import axios from 'axios';
import React, { useState } from 'react';

function Character({character, url, setUpdated, updated}) {

    console.log(character);

    const defaultCharacterState = {
        name: character.name,
        character_class: character.character_class,
        HP: character.HP,
        damage_die: character.damage_die,
        coin: character.coin,
        STR: character.STR,
        DEX: character.DEX,
        CON: character.CON,
        INT: character.INT,
        WIS: character.WIS,
        CHA: character.CHA,
        equipment: character.equipment.split(', '),
        spells: character.spells.split(', ')
    }

    const [characterState, setCharacterState] = useState(defaultCharacterState);

    const [editStats, setEditStats] = useState(false);
    const [editSkills, setEditSkills] = useState(false);
    const [editEquipment, setEditEquipment] = useState(false);
    const [editSpells, setEditSpells] = useState(false);

    const handleChange = (e) => {
        setCharacterState({...characterState, [e.target.id]: e.target.value});
    }

    const editCharacter = () => {
        const updatedCharacter = {...characterState, equipment: characterState.equipment.join(', '), spells: characterState.spells.join(', ')}
        axios.put(`${url}/characters/${character.id}`, updatedCharacter)
            .then(res => console.log(res))
            .catch(console.error);
        
        setEditStats(false);
        setEditSkills(false);
        setEditEquipment(false);
        setEditSpells(false);
        setUpdated(!updated);
    }

    if (character) {
       return (
        <div className='Character'>
            <h2>{characterState.name}</h2>
            <h4>{characterState.character_class}</h4>
            <hr />
            {(editStats) ?
            <button type='button' onClick={editCharacter}><i class="fas fa-check"></i></button> :
            <button type='button' onClick={() => setEditStats(!editStats)}><i className="fas fa-edit"></i></button>
            }
            
            <div className='char-stats'>
                {(editStats) ?
                <input id='HP' type='text' placeHolder={characterState.HP} onChange={handleChange} /> :
                <h4><i className="fas fa-heart"></i> {characterState.HP}</h4>
                }
                                 
                
                <h4><i className="fas fa-heart-broken"></i> {characterState.damage_die}</h4>
               
                <h4><i className="fas fa-coins"></i> {characterState.coin}</h4>
                
            </div>
            <hr />
            <div className='skill-points'>
                <h4 className='skill-point'><i className="fas fa-fist-raised"></i> {characterState.STR}</h4>
                <h4 className='skill-point'><i className="fas fa-hand-sparkles"></i> {characterState.DEX}</h4>
                <h4 className='skill-point'><i className="fas fa-shield-alt"></i> {characterState.CON}</h4>
                <h4 className='skill-point'><i className="fas fa-book"></i> {characterState.INT}</h4>
                <h4 className='skill-point'><i className="fas fa-brain"></i> {characterState.WIS}</h4>
                <h4 className='skill-point'><i className="far fa-comments"></i> {characterState.CHA}</h4>
            </div>
            <hr />
            <h4>equipment</h4>
            <div className='equipment'>
                {characterState.equipment.map(item => {
                    return (
                            <h6 key={item}>{item}</h6>
                    )
                })}
            </div>
            <hr />
            <h4>spells</h4>
            <div>
                {characterState.spells.map(spell => {
                    return (
                        <h6 key={spell}>{spell}</h6>
                    )
                })}
            </div>
        </div>
        ); 
    } else {
        <h4>loading...</h4>
    }
    
}

export default Character;