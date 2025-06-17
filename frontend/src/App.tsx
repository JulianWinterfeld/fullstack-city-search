import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type City = {
  id: number;
  name: string;
  country: string;
  population: number;
};

function App() {
  const [population, setPopulation] = useState('');
  const [cities, setCities] = useState<City[]>([]);

  const fetchCities = async () => {
    try {
      const res = await fetch(`http://localhost:3001/cities?minPopulation=${population}`);
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Städte:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🌍 Willkommen zur Städte-Suche</h1>

      <label>
        Mindestbevölkerung:
        <input
          type="number"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>

      <button onClick={fetchCities} style={{ marginLeft: '1rem' }}>
        Jetzt suchen
      </button>

      <h2>Ergebnisse:</h2>
      {cities.length === 0 ? (
        <p>Keine Städte gefunden.</p>
      ) : (
        <ul>
          {cities.map((city) => (
            <li key={city.id}>
              {city.name} ({city.country}) – {city.population.toLocaleString()} Einwohner
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
