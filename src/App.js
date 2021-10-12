import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Character from './components/Character';
import { Route } from 'react-router-dom';
import Home from './components/Home';

function App() {

  const url = 'http://localhost:8000';

  const [characters, setCharacters] = useState(null);
  const [updated, setUpdated] = useState(false);

  const getCharacters = () => {
    axios.get(`${url}/characters/`)
      .then(res => setCharacters(res.data))
      .catch(console.error);
  }
  
  useEffect(() => {
    getCharacters()
  }, [updated]);

  if (characters) {
    return (
      <div className="App">
        <Header />
        <Route path='/' 
          exact
          render={routerProps => (
            <Home characters={characters} />
          )}
        />
        <Route path='/:name'
          exact
          render={routerProps => (
            <Character 
              match={routerProps.match} 
              character={characters.filter(char => (char.name === routerProps.match.params.name))[0]} 
              url={url}
              updated={updated}
              setUpdated={setUpdated}
            />
          )}
        />
        
      </div>
    );
  } else {
    return (
      <h6>assembling party...</h6>
    )
  }
}

export default App;
