import React from 'react';
import { AnswerObject } from '../App';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

interface IProps {
	questions: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswers: AnswerObject | undefined;
	questionNumber: number;
	totalQuestions: number;
}

function QuestionCard({ questions, answers, callback, userAnswers, questionNumber, totalQuestions }: IProps) {
	return (
		<Wrapper>
			<p className="number">
				Queston: {questionNumber} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: questions }} />
			<div>
				{answers?.map((answer) => (
					<ButtonWrapper correct={userAnswers?.correctAnswer === answer} userClicked={userAnswers?.answer === answer} key={answer}>
						<button disabled={!!userAnswers} value={answer} onClick={callback}>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</button>
					</ButtonWrapper>
				))}
			</div>
		</Wrapper>
	);
}

export default QuestionCard;
