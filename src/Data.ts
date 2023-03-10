import { shuffleArray } from './utils';

export interface Question {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
}

export interface QuestionState extends Question {
	answer: string[];
}

export enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard',
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
	const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

	const data = await (await fetch(endPoint)).json();

	return data.results.map((question: Question) => ({
		...question,
		answer: shuffleArray([...question.incorrect_answers, question.correct_answer]),
	}));
};
