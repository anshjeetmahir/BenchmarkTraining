var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = questions;
    }
    Quiz.prototype.getCurrentQuestion = function () {
        return this.questions[this.currentQuestionIndex];
    };
    Quiz.prototype.checkAnswer = function (answer) {
        var isCorrect = this.getCurrentQuestion().correctAnswer === answer;
        if (isCorrect) {
            this.score++;
        }
        this.currentQuestionIndex++;
        return isCorrect;
    };
    Quiz.prototype.isQuizOver = function () {
        return this.currentQuestionIndex >= this.questions.length;
    };
    Quiz.prototype.getScore = function () {
        return this.score;
    };
    Quiz.prototype.resetQuiz = function () {
        this.currentQuestionIndex = 0;
        this.score = 0;
    };
    return Quiz;
}());
var questions = [
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
var quiz = new Quiz(questions);
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var nextButton = document.getElementById("next");
var resultElement = document.getElementById("result");
var restartButton = document.getElementById('restart');
restartButton.textContent = "Restart Quiz";
restartButton.classList.add("btn", "btn-primary", "mt-3", "d-none");
restartButton.addEventListener("click", function () {
    quiz.resetQuiz();
    restartButton.classList.add('d-none');
    nextButton.classList.remove('d-none');
    resultElement.classList.add('d-none');
    displayQuestion();
});
function displayResult() {
    if (quiz.isQuizOver()) {
        questionElement.textContent = "Quiz Over!";
        choicesElement.innerHTML = "";
        nextButton.classList.add('d-none');
        resultElement.textContent = "Your score: ".concat(quiz.getScore(), " / ").concat(questions.length);
        resultElement.classList.remove('d-none');
        restartButton.classList.remove('d-none');
        return;
    }
}
function displayQuestion() {
    displayResult();
    var currentQuestion = quiz.getCurrentQuestion();
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    nextButton.classList.add('d-none');
    var answerSelected = false;
    var selectedButton = null;
    currentQuestion.choices.forEach(function (choice) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("btn", "btn-outline-light", "w-100", "mb-2");
        choiceButton.addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded', displayQuestion);
// displayQuestion();
