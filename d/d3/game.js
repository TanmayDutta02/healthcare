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
        question: 'What does the “19” in “COVID-19” refer to?',
        choice1: 'There are 19 variants of the coronavirus.',
        choice2: 'There are 19 symptoms of coronavirus disease.',
        choice3: 'This is the 19th coronavirus pandemic.',
        choice4: 'The coronavirus and the disease it causes were identified in 2019',
        answer: 4,
    },
    {
        question:
            "The “corona” in coronavirus means:",
        choice1: "Sun",
        choice2: "Beer",
        choice3: "Strong",
        choice4: "Crown",
        answer: 4,
    },
    {
        question: "An effective hand sanitizer contains at least this percentage of alcohol to kill the coronavirus and other germs:",
        choice1: "30%",
        choice2: "45%",
        choice3: "60%",
        choice4: "80%",
        answer: 3,
    },

    {
        question: "Which of these is not a common COVID-19 symptom?",
        choice1: "Blurred Vision",
        choice2: "A cough",
        choice3: "Unusual Fatigue",
        choice4: "Fever",
        answer: 1,
    },
    {
        question: "When is it safe to be closer than 6 feet to another person who is not sick with COVID-19?",
        choice1: "When the person is related to you.",
        choice2: "When you have already had COVID-19.",
        choice3: "When the person normally lives with you.",
        choice4: "When you are outdoors.",
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
