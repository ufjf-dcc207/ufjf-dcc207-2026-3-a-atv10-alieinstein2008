import { useGame } from './GameContext';

interface TubeProps {
  tubeIndex: number;
}

export default function Tube({ tubeIndex }: TubeProps) {
  const { state, dispatch } = useGame();
  
  const tube = state.tubes[tubeIndex];
  const isSelected = state.selectedTube === tubeIndex;

  const handleClick = () => {
    dispatch({ type: 'CLICK_TUBE', payload: tubeIndex });
  };

  return (
    <div 
      className={`tube ${isSelected ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      {tube.map((color, index) => (
        <div 
          key={index} 
          className="ball" 
          style={{ backgroundColor: color }} 
        />
      ))}
    </div>
  );
}