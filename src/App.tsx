import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { QuestionState, fetchQuizQuestions, Difficulty } from './Data';
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

export interface AnswerObject {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
}

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const startTrivaia = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			//사용자 답
			const answer = e.currentTarget.value;

			console.log('answer: :::::::::::', answer);
			//해당 문제 답과 사용자 답이 맞는지 체크
			const correct = questions[number].correct_answer === answer;

			//맞다면 score 계산
			if (correct) setScore((prev) => prev + 1);

			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};

			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};

	const nextQuestion = () => {
		//다음 질문 넘어가기
		const nextQuestion = number + 1;

		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<div className="App">
					<h1>React Quiz</h1>
					{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
						<button className="start" onClick={startTrivaia}>
							Start
						</button>
					) : null}
					{!gameOver && <p className="score">Score: {score}</p>}
					{loading && <p>Loading Qustions ...</p>}

					{!loading && !gameOver && (
						<QuestionCard
							questionNumber={number + 1}
							totalQuestions={TOTAL_QUESTIONS}
							questions={questions[number].question}
							answers={questions[number].answer}
							userAnswers={userAnswers ? userAnswers[number] : undefined}
							callback={checkAnswer}
						/>
					)}

					{!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
						<button className="next" onClick={nextQuestion}>
							Next Question
						</button>
					)}
				</div>
			</Wrapper>
		</>
	);
}

export default App;
