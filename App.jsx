import { useState } from "react";
import "./App.css";

function App() {
  // Cada player tiene nombre y vida
  const [players, setPlayers] = useState([
    { id: 1, name: "Jugador 1", life: 20 },
    { id: 2, name: "Jugador 2", life: 20 }
  ]);

  const updateLife = (id, amount) => {
    setPlayers(prev => 
      prev.map(p => p.id === id ? { ...p, life: p.life + amount } : p)
    );
  };

  const updateName = (id, newName) => {
    setPlayers(prev => 
      prev.map(p => p.id === id ? { ...p, name: newName } : p)
    );
  };

  const handleReset = () => {
    const confirmar = window.confirm("¿Seguro que quieres reiniciar la vida a 20?");
    if (confirmar) {
      setPlayers(prev => prev.map(p => ({ ...p, life: 20 })));
    }
  };

  const winner = players.find(p => p.life <= 0);

  return (
    <div className="mtg-container">
      <h1>Magic Life Counter</h1>
      
      <div className="players">
        {players.map(player => (
          <div key={player.id} className="player-card">
            {/* INPUT CONTROLADO */}
            <input
              type="text"
              className="name-input"
              value={player.name}
              onChange={(e) => updateName(player.id, e.target.value)}
              placeholder={`Nombre jugador ${player.id}`}
            />
            
            <p className={`life ${player.life <= 0 ? 'dead' : ''}`}>
              {player.life}
            </p>
            
            <div className="buttons">
              <button onClick={() => updateLife(player.id, -1)}>-1</button>
              <button onClick={() => updateLife(player.id, 1)}>+1</button>
            </div>
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={handleReset}>
        Reiniciar Juego
      </button>

      {winner && (
        <h2 className="winner">
          ¡{players.find(p => p.id !== winner.id)?.name} Gana!
        </h2>
      )}
    </div>
  );
}

export default App;
