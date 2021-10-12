import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RollModal from './RollModal';

function Header(props) {

    const [rollModal, setRollModal] = useState(false);

    return (
        <div className='Header'>
            {(rollModal) &&
                <RollModal setRollModal={setRollModal} />
            }
            <Link to={'/'} ><h1>char-sheetz</h1></Link>
            <button type='button' onClick={() => setRollModal(true)}>roll</button>
        </div>
    );
}

export default Header;