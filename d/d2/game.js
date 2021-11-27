const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which of these is a common source of Vitamin A?',
        choice1: 'Cheese',
        choice2: 'Potatoes especially with skin',
        choice3: 'Fruits and vegetables particularly carrots',
        choice4: 'Brewers Yeast',
        answer: 3,
    },
    {
        question:
            "What is the primary purpose of making sure your body receives carbohydrates?",
        choice1: "To minimise the body's ability to absorb calcium",
        choice2: "To heighten cholesterol levels",
        choice3: "To improve bone marrow",
        choice4: "To provide the body with energy",
        answer: 4,
    },
    {
        question: "What ill-effect might be caused by the over-consumption of fluids?",
        choice1: "A weakened immune system",
        choice2: "Dilution and lowering of sodium levels in the blood",
        choice3: "Increased conversion to fat",
        choice4: "Aggravated stomach acids",
        answer: 2,
    },
    {
        question: "Which nutrients are especially important for promoting good bone strength?",
        choice1: "Carbohydrates",
        choice2: "Calcium and Vitamin D",
        choice3: "Omega 3",
        choice4: "Iron and Sodium",
        answer: 2,
    },
    {
        question: "How many grams of fibre is it recommended we eat every day?",
        choice1: "200",
        choice2: "Atleast 18",
        choice3: "No more than 50",
        choice4: "5-10",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
