import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Character({character, url, setUpdated, updated}) {


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
        spells: character.spells.split(', '),
        level: character.level,
    }

    const [characterState, setCharacterState] = useState(defaultCharacterState);

    const [editStats, setEditStats] = useState(false);
    const [editSkills, setEditSkills] = useState(false);
    const [editEquipment, setEditEquipment] = useState(false);
    const [editSpells, setEditSpells] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [editLevel, setEditLevel] = useState(false);

    const handleInput = (e) => {
        setNewItem(e.target.value);
    }

    const addItem = (set) => {
        const newArr = [...characterState[set]];
        newArr.push(newItem);
        const characterToUpdate = ({...characterState, [set]: newArr});
        const updatedCharacter = {...characterToUpdate, equipment: characterToUpdate.equipment.join(', '), spells: characterToUpdate.spells.join(', ')}
        axios.put(`${url}/characters/${character.id}`, updatedCharacter)
            .then(res => {
                setCharacterState({...characterState, [set]: newArr});
                setEditStats(false);
                setEditSkills(false);
                setEditEquipment(false);
                setEditSpells(false);
                setUpdated(!updated);
            })
            .catch(console.error);
    }

    const deleteItem = (set, item) => {
        const newArr = characterState[set].filter(el => el !== item);
        let updatedCharacter = {};
        if (set === 'equipment') {
            updatedCharacter = {...characterState, equipment: newArr.join(', '), spells: characterState.spells.join(', ')};
        } else {
            updatedCharacter = {...characterState, equipment: characterState.equipment.join(', '), spells: newArr.join(', ')};
        }
        axios.put(`${url}/characters/${character.id}`, updatedCharacter)
            .then(res => {
                setCharacterState({...characterState, [set]: newArr});
                setEditStats(false);
                setEditSkills(false);
                setEditEquipment(false);
                setEditSpells(false);
                setUpdated(!updated);
            })
            .catch(console.error);
    }

    const handleChange = (e) => {
        setCharacterState({...characterState, [e.target.id]: e.target.value});
    }

    const handleLevelEdit = () => {
        if (editLevel) {
            const updatedCharacter = {...characterState, equipment: characterState.equipment.join(', '), spells: characterState.spells.join(', ')}
            axios.put(`${url}/characters/${character.id}`, updatedCharacter)
                .then(res => {
                    setEditStats(false);
                    setEditSkills(false);
                    setEditEquipment(false);
                    setEditSpells(false);
                    setUpdated(!updated);
                })
                .catch(console.error);
        }
        setEditLevel(!editLevel)
    }

    const handleLevelChange = (e) => {
        if (e.target.id === 'dec') {
            setCharacterState({...characterState, level: characterState.level - 1});
        } else {
            setCharacterState({...characterState, level: characterState.level + 1});
        }
    }

    const editCharacter = () => {
        const updatedCharacter = {...characterState, equipment: characterState.equipment.join(', '), spells: characterState.spells.join(', ')}
        axios.put(`${url}/characters/${character.id}`, updatedCharacter)
            .then(res => {
                setEditStats(false);
                setEditSkills(false);
                setEditEquipment(false);
                setEditSpells(false);
                setUpdated(!updated);
            })
            .catch(console.error);
        
        
    }

    useEffect(() => {
    }, [updated])

    if (character) {
       return (
        <div className='Character'>
            <div className='character-header'>
                <div className='character-name-and-class'>
                    <h2 className='char-name'>{characterState.name}</h2>
                    <h4 className='italic char-class'>{characterState.character_class}</h4>
                </div>
                <div className='level-div'>
                {(editLevel) && 
                    <div>
                        {(characterState.level > 1) &&
                            <button className='level-buttons' type='button' onClick={handleLevelChange}><i id='dec' class="fas fa-minus-circle"></i></button>
                        }
                    </div>
                }
                <h4 className={`char-level ${(editLevel) ? 'dotted' : null}`} onClick={handleLevelEdit}>{characterState.level}</h4>
                {(editLevel) &&
                    <div >
                        {(characterState.level < 20) &&
                            <button className='level-buttons' type='button' onClick={handleLevelChange}><i id='inc' class="fas fa-plus-circle"></i></button>
                        }
                    </div>
                }
                </div>
                
            </div>
            
            <hr />
            {(editStats) ?
            <button className='edit-button confirm' type='button' onClick={editCharacter}><i className="fas fa-check"></i></button> :
            <button className='edit-button' type='button' onClick={() => setEditStats(!editStats)}><i className="fas fa-edit"></i></button>
            }
            
            <div className='char-stats'>
                {(editStats) ?
                <div className='stat-input-div'>
                    <h4><i className="fas fa-heart"></i></h4>
                    <input className='stat-input' id='HP' min='0' type='number' value={characterState.HP} onChange={handleChange} />
                </div>
                : <h4><i className="fas fa-heart"></i> {characterState.HP}</h4>
                }

                {(editStats) ?
                <div className='stat-input-div'>
                    <h4><i className="fas fa-heart-broken"></i></h4>
                    <input className='stat-input' id='damage_die' type='text' value={characterState.damage_die} onChange={handleChange} />
                </div>
                : <h4><i className="fas fa-heart-broken"></i> {characterState.damage_die}</h4>
                }

                {(editStats) ?
                <div className='stat-input-div'>
                    <h4><i className="fas fa-coins"></i></h4>
                    <input className='stat-input' id='coin' min='0' type='number' value={characterState.coin} onChange={handleChange} />
                </div>
                : <h4><i className="fas fa-coins"></i> {characterState.coin}</h4>
                }
                
                
            </div>
            <hr />

            {(editSkills) ?
            <button className='edit-button confirm' type='button' onClick={editCharacter}><i className="fas fa-check"></i></button> :
            <button className='edit-button' type='button' onClick={() => setEditSkills(!editSkills)}><i className="fas fa-edit"></i></button>
            }

            <div className='skill-points'>
                <div className='skill-points-row'>
                    {(editSkills) ?
                    <div className='stat-input-div'>
                        <h4 className='skill-point'><i className="fas fa-fist-raised"></i></h4>
                        <input className='stat-input' id='STR' min='0' max='20' type='number' value={characterState.STR} onChange={handleChange} />
                    </div>
                    : <h4 className='skill-point'><i className="fas fa-fist-raised"></i> {characterState.STR}</h4>
                    }
                    
                    {(editSkills) ?
                    <div className='stat-input-div'>
                        <h4 className='skill-point'><i className="fas fa-hand-sparkles"></i></h4>
                        <input className='stat-input' id='DEX' min='0' max='20' type='number' value={characterState.DEX} onChange={handleChange} />
                    </div>
                    : <h4 className='skill-point'><i className="fas fa-hand-sparkles"></i> {characterState.DEX}</h4>
                    }

                    {(editSkills) ?
                    <div className='stat-input-div'>
                        <h4 className='skill-point'><i className="fas fa-shield-alt"></i></h4>
                        <input className='stat-input' id='CON' min='0' max='20' type='number' value={characterState.CON} onChange={handleChange} />
                    </div>
                    : <h4 className='skill-point'><i className="fas fa-shield-alt"></i> {characterState.CON}</h4>
                    }
                </div>

                <div className='skill-points-row'>
                    {(editSkills) ?
                    <div className='stat-input-div'>
                        <h4 className='skill-point'><i className="fas fa-book"></i></h4>
                        <input className='stat-input' id='INT' min='0' max='20' type='number' value={characterState.INT} onChange={handleChange} />
                    </div>
                    : <h4 className='skill-point'><i className="fas fa-book"></i> {characterState.INT}</h4>
                    }

                    {(editSkills) ?
                    <div className='stat-input-div'>
                        <h4 className='skill-point'><i className="fas fa-brain"></i></h4>
                        <input className='stat-input' id='WIS' min='0' max='20' type='number' value={characterState.WIS} onChange={handleChange} />
                    </div>
                    : <h4 className='skill-point'><i className="fas fa-brain"></i> {characterState.WIS}</h4>
                    }
                    
                    {(editSkills) ?
                    <div className='stat-input-div'>
                        <h4 className='skill-point'><i className="fas fa-comments"></i></h4>
                        <input className='stat-input' id='CHA' min='0' max='20' type='number' value={characterState.CHA} onChange={handleChange} />
                    </div>
                    : <h4 className='skill-point'><i className="far fa-comments"></i> {characterState.CHA}</h4>
                    }
                </div>
                
                
                
            </div>
            <hr />
            {(editEquipment) ?
            <button className='edit-button confirm' type='button' onClick={editCharacter}><i className="fas fa-check"></i></button> :
            <button className='edit-button' type='button' onClick={() => setEditEquipment(!editEquipment)}><i className="fas fa-edit"></i></button>
            }

            <h4 className='section-title'>equipment</h4>
            <div className='equipment'>
                {characterState.equipment.map(item => {
                    if (editEquipment) {
                        return (
                            <div className='edit-list-div'>
                                <h6 className='equipment-item' key={item}>{item}</h6>
                                <button className='delete-button' key={item} type='button' onClick={() => deleteItem('equipment', item)}><i className="far fa-times-circle"></i></button>
                            </div>
                        )
                    } else {
                        return <h6 className='equipment-item' key={item}>{item}</h6>
                    }
                })}
                {(editEquipment) && 
                    <div>
                        <input className='add-item-input' type='text' onChange={handleInput} />
                        <button className='add-item-button confirm' type='button' onClick={() => addItem('equipment')}><i className="fas fa-plus-circle"></i></button>
                    </div>
                }
            </div>
            <hr />

            {(editSpells) ?
            <button className='edit-button confirm' type='button' onClick={editCharacter}><i className="fas fa-check"></i></button> :
            <button className='edit-button' type='button' onClick={() => setEditSpells(!editSpells)}><i className="fas fa-edit"></i></button>
            }

            <h4 className='section-title'>spells</h4>
            <div>
                {characterState.spells.map(spell => {
                    if (editSpells) {
                        return (
                        <div className='edit-list-div'>
                            <h6 className='spell-item' key={spell}>{spell}</h6>
                            <button id='spell' className='delete-button' key={spell} type='button' onClick={() => deleteItem('spells', spell)}><i className="far fa-times-circle"></i></button>
                        </div>
                        )
                    } else {
                        return <h6 className='spell-item' key={spell}>{spell}</h6>
                    }
                    
                })}
                {(editSpells) && 
                    <div>
                        <input className='add-item-input' type='text' onChange={handleInput} />
                        <button className='add-item-button confirm' type='button' onClick={() => addItem('spells')}><i className="fas fa-plus-circle"></i></button>
                    </div>
                }
            </div>
            {(characterState.character_class === 'conjurer' || characterState.character_class === 'cleric') &&
                <div className='spell-slots'>
                    <h4>spell slots</h4>
                    {(characterState.level >= 1) && 
                        <div>
                            <h6>lvl 1 spells</h6>
                            
                        </div>
                    }

                </div>
            }
        </div>
        ); 
    } else {
        <h4>loading...</h4>
    }
    
}

export default Character;