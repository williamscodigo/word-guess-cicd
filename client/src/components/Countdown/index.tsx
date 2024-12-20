import React from 'react';

type CountdownProps = {
  guesses: number;
  isCorrect?: boolean; // Optional prop to indicate if the guess was correct
  hasGuessed?: boolean; // Optional prop to indicate if a guess was made
};

const Countdown: React.FC<CountdownProps> = ({ guesses, isCorrect, hasGuessed }) => {
  return (
    <div>
      {/* Remaining Guesses */}
      <p data-cy="countdown">Guesses Remaining: {guesses}</p>

      {/* Toast Message */}
      {hasGuessed && (
        <div data-cy="toast">
          {isCorrect ? <p style={{ color: '#006400' }}>Correct!!</p> : <p style={{ color: '#ff0000' }}>Incorrect!!!</p>}
        </div>
      )}
    </div>
  );
};

export default Countdown;
