import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

    return (
        <div className='Header'>
            <Link className='home-link' to={'/'} ><h1>char-sheetz</h1></Link>
        </div>
    );
}

export default Header;