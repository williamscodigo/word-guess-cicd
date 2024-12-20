
import Word from '../components/Word/index.js';
import { useEffect, useState } from 'react';
import { getInitialGameState, checkLetter } from '../utils/gameApi.js';
import type { GameStart } from '../models/GameStart';
import type { Game } from '../models/Game';
import Keyboard from '../components/Keyboard/index.js';
import WinLoss from '../components/WinLoss/index.js';
import Countdown from '../components/Countdown/index.js'; // Import the Countdown component

const KEYS: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const GamePage = () => {
  const [gameStart, setGameStart] = useState<GameStart | null>(null);
  const [gameState, setGameState] = useState<Game | null>(null);
  //Added the fowllowing state variables to track if a guess was made and if it was correct
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [hasGuessed, setHasGuessed] = useState<boolean>(false); 

  useEffect(() => {
    const fetchGameStart = async () => {
      try {
        const data = await getInitialGameState();
        setGameStart({id: data.id, maskedWord: data.maskedWord});
        setGameState(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGameStart();
  }, []);

  const handleGuess = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const letter = event.currentTarget.value;
    if (gameState && gameStart) {
      try {
        const updatedGame = await checkLetter(gameStart.id, { letter });
        setGameState(updatedGame);
        // Update guess status
        setIsCorrect(updatedGame.isCorrect);
        setHasGuessed(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const maskedWord = gameState?.maskedWord || '';
  const guesses = gameState?.guesses || [];
  const isWinner = gameState?.isWinner || false;
  const isComplete = gameState?.isComplete || false;
  const remainingGuesses = gameState?.remainingGuesses || 0; // Add remainingGuesses to the game state

  return (
    <main>
      <div className="flex-row justify-center" data-cy="game">
        <div
          className="col mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          {!isComplete &&
            <div data-cy="game-area">
              {
                // TODO: Create a Countdown component that displays the number of guesses remaining and passes the provided tests
              }
              <Countdown 
                guesses={remainingGuesses} 
                isCorrect={isCorrect} 
                hasGuessed={hasGuessed} 
              />
              <Word word={maskedWord} />
              <Keyboard handleGuess={handleGuess} guesses={guesses} KEYS={KEYS} />
            </div>
          }
          {isComplete && <WinLoss isWinner={isWinner} solution={gameState?.solution} />}
        </div>
      </div>
    </main>
  );
};

export default GamePage;