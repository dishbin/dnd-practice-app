import React from 'react';
import { Link } from 'react-router-dom';

function Home({characters}) {
    return (
        <div className='Home'>
            {(characters) &&
                characters.map(char => {
                    return <Link key={char.name} to={'/' + char.name}>{char.name}</Link>
                })
            }
        </div>
    );
}

export default Home;