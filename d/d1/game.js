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
        question: 'Which one of the following is an unhealthy habit?',
        choice1: 'Sharing food',
        choice2: 'Bathing twice a day',
        choice3: 'Drinking boiled water',
        choice4: 'Eating without washing one’s hand',
        answer: 4,
    },
    {
        question:
            "Which of the following factors is necessary for a healthy person?",
        choice1: "Vaccination",
        choice2: "Balanced diet",
        choice3: "Personal hygiene",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "Cleanliness, physical exercise, rest and sleep are a part of ________.",
        choice1: "Hygiene",
        choice2: "Social hygiene",
        choice3: "Personal hygiene",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "How many times one should wash teeth?",
        choice1: "once a day",
        choice2: "Twice a day",
        choice3: "Thrice a day",
        choice4: "4 times a day",
        answer: 2,
    },

    {
        question: "Normal temperature of human body is:",
        choice1: "40.5 degree Fahrenheit",
        choice2: "36.9 degree Fahrenheit",
        choice3: "98.4 degree Fahrenheit",
        choice4: "82.4 degree Fahrenheit",
        answer: 3,
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