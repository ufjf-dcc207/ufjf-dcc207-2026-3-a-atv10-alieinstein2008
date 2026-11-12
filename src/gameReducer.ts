export type Color = 'red' | 'blue'; 
export type TubeState = Color[];

export interface GameState {
  tubes: TubeState[];
  selectedTube: number | null;
  isWon: boolean;
}

export type GameAction = 
  | { type: 'CLICK_TUBE'; payload: number }
  | { type: 'RESET' };

export const initialState: GameState = {
  tubes: [
    ['red', 'blue', 'red', 'blue'],
    ['blue', 'red', 'blue', 'red'],
    [],
  ],
  selectedTube: null,
  isWon: false,
};

const checkWinCondition = (tubes: TubeState[]): boolean => {
  return tubes.every(
    (tube) => tube.length === 0 || (tube.length === 4 && tube.every((c) => c === tube[0]))
  );
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'CLICK_TUBE': {
      if (state.isWon) return state;

      const clickedIndex = action.payload;

      if (state.selectedTube === null) {
        if (state.tubes[clickedIndex].length === 0) return state;
        return { ...state, selectedTube: clickedIndex };
      }

      if (state.selectedTube === clickedIndex) {
        return { ...state, selectedTube: null };
      }

      const sourceTube = [...state.tubes[state.selectedTube]];
      const targetTube = [...state.tubes[clickedIndex]];

      const ballToMove = sourceTube[sourceTube.length - 1];
      const targetTopBall = targetTube.length > 0 ? targetTube[targetTube.length - 1] : null;

      if (
        targetTube.length >= 4 || 
        (targetTopBall !== null && targetTopBall !== ballToMove)
      ) {
        return { ...state, selectedTube: null };
      }

      sourceTube.pop();
      targetTube.push(ballToMove);

      const newTubes = [...state.tubes];
      newTubes[state.selectedTube] = sourceTube;
      newTubes[clickedIndex] = targetTube;

      return {
        ...state,
        tubes: newTubes,
        selectedTube: null,
        isWon: checkWinCondition(newTubes),
      };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};