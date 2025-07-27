import React, { useState } from 'react';
import './App.css';

// Mock array of quiz questions
const questions = [
  {
    id: 'q1',
    text: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    correctAnswer: '4',
  },
  {
    id: 'q2',
    text: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    id: 'q3',
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter'],
    correctAnswer: 'Mars',
  },
];

function getRandomQuestionIndex(prevIndex) {
  let idx;
  do {
    idx = Math.floor(Math.random() * questions.length);
  } while (questions.length > 1 && idx === prevIndex);
  return idx;
}

function App() {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(() => getRandomQuestionIndex(-1));
  const [selectedOption, setSelectedOption] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [prevIndex, setPrevIndex] = useState(-1);
  const [questionCount, setQuestionCount] = useState(1);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setPrevIndex(currentIndex);
    const nextIndex = getRandomQuestionIndex(currentIndex);
    setCurrentIndex(nextIndex);
    setSelectedOption('');
    setShowFeedback(false);
    setFeedback('');
    setQuestionCount(questionCount + 1);
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <div>
        <p>Score: {score}</p>
        <p>Question {questionCount}:</p>
        <p>{currentQuestion.text}</p>
        <div>
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={showFeedback}
              style={{
                margin: '0.5em',
                background: selectedOption === option ? '#61dafb' : '',
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {!showFeedback && (
          <button onClick={handleSubmit} disabled={!selectedOption} style={{ marginTop: '1em' }}>
            Submit
          </button>
        )}
        {showFeedback && (
          <div>
            <p>{feedback}</p>
            <button onClick={handleNext} style={{ marginTop: '1em' }}>
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
