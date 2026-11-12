import { GameProvider, useGame } from './GameContext';
import Tube from './Tube';
import './index.css'; 

const GameBoard = () => {
  const { state, dispatch } = useGame();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Magic Sort</h1>

      {state.isWon && (
        <h2 style={{ color: '#2ecc71', margin: '20px 0' }}>Você Venceu! 🎉</h2>
      )}

      <div className="board">
        {state.tubes.map((_, index) => (
          <Tube key={index} tubeIndex={index} />
        ))}
      </div>

      <button
        onClick={() => dispatch({ type: 'RESET' })}
        style={{ marginTop: '40px', padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}
      >
        Reiniciar Jogo
      </button>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
}