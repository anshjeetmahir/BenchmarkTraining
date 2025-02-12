

interface Question {
    question: string;
    choices: string[];
    correctAnswer: string;
}

class Quiz {
    private questions: Question[];
    private currentQuestionIndex: number = 0;
    private score: number = 0;

    constructor(questions: Question[]) {
        this.questions = questions;
    }

    getCurrentQuestion(): Question {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(answer: string): boolean {
        const isCorrect = this.getCurrentQuestion().correctAnswer === answer;
        if (isCorrect) {
            this.score++;
        }
        this.currentQuestionIndex++;
        return isCorrect;
    }

    isQuizOver(): boolean {
        return this.currentQuestionIndex >= this.questions.length;
    }

    getScore(): number {
        return this.score;
    }

    resetQuiz(): void {
        this.currentQuestionIndex = 0;
        this.score = 0;
    }
}

const questions: Question[] = [
    {
        question: "Which keyword is used to declare a constant variable in JavaScript?",
        choices: ["var", "let", "const", "static"],
        correctAnswer: "const"
    },
    {
        question: "What is the output of `console.log(typeof null)` in JavaScript?",
        choices: ["null", "object", "undefined", "string"],
        correctAnswer: "object"
    },
    {
        question: "Which of the following is a valid TypeScript type?",
        choices: ["number", "boolean", "any", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "What is the purpose of interfaces in TypeScript?",
        choices: [
            "To enforce a structure on objects",
            "To define a class",
            "To create a loop",
            "To handle exceptions"
        ],
        correctAnswer: "To enforce a structure on objects"
    },
    {
        question: "Which of the following statements is true about TypeScript?",
        choices: [
            "TypeScript is a superset of JavaScript",
            "TypeScript can run in the browser without transpiling",
            "TypeScript does not support object-oriented programming",
            "TypeScript is dynamically typed"
        ],
        correctAnswer: "TypeScript is a superset of JavaScript"
    }
];


const quiz = new Quiz(questions);

const questionElement = document.getElementById("question") as HTMLElement;
const choicesElement = document.getElementById("choices") as HTMLElement;
const nextButton = document.getElementById("next") as HTMLElement;
const resultElement = document.getElementById("result") as HTMLElement;
const restartButton = document.getElementById('restart') as HTMLElement;

restartButton.textContent = "Restart Quiz";
restartButton.classList.add("btn", "btn-primary", "mt-3", "d-none");
restartButton.addEventListener("click", () => {
    quiz.resetQuiz();
    restartButton.classList.add('d-none');
    nextButton.classList.remove('d-none');
    resultElement.classList.add('d-none');
    displayQuestion();
});


function displayResult(): void {
    if (quiz.isQuizOver()) {
        questionElement.textContent = "Quiz Over!";
        choicesElement.innerHTML = "";
        nextButton.classList.add('d-none');
        resultElement.textContent = `Your score: ${quiz.getScore()} / ${questions.length}`;
        resultElement.classList.remove('d-none');
        restartButton.classList.remove('d-none');
        return;
    }
}

function displayQuestion(): void {

    displayResult();

    const currentQuestion = quiz.getCurrentQuestion();
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    nextButton.classList.add('d-none');

    let answerSelected = false;
    let selectedButton: HTMLButtonElement | null = null;

    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("btn", "btn-outline-light", "w-100", "mb-2");

        choiceButton.addEventListener('click', () => {
            if (selectedButton) {
                selectedButton.style.color = '';
                selectedButton.style.backgroundColor = '';
            }

            choiceButton.style.color = 'black';
            choiceButton.style.backgroundColor = 'white';
            selectedButton = choiceButton;

            if (!answerSelected) {
                quiz.checkAnswer(choice);
                answerSelected = true;
                nextButton.classList.remove('d-none');
            }
        });

        choicesElement.appendChild(choiceButton);
    });
}

nextButton.addEventListener("click", displayQuestion);

document.addEventListener('DOMContentLoaded', displayQuestion)

