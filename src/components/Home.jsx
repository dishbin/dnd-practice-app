import React from 'react';
import { Link } from 'react-router-dom';

function Home({characters}) {

    characters.sort((a, b) => a.id - b.id);

    return (
        <div className='Home'>
            {(characters) &&
                characters.map(char => {
                    return <Link className='char-link' key={char.name} to={'/' + char.name}>{char.name}</Link>
                })
            }
        </div>
    );
}

export default Home;