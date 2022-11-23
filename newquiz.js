function checkLoginStatus() {
    let loginStatus = localStorage.getItem('candidate')
    if (!loginStatus) {
        alert('Kindly login to take quiz')
        location.href = "index.html"
        login_section.style.display = "block"
    }
}
checkLoginStatus()
let october1 = 1664614800000;
let schedule_check = document.getElementById('schedule_check')
let quiz_body = document.getElementById('quiz_body')
let wait_time = document.getElementById('wait_time')
let days = document.getElementById('days')
let hours = document.getElementById('hours')
let minutes = document.getElementById('minutes')
let today = new Date().getTime()
let countDownTime = october1 - today

let timer = setInterval(() => {
    let today = new Date().getTime()
    let countDownTime = october1 - today

    let daysLeft = Math.floor((countDownTime / 1000) / 60 / 60 / 24)
    let hoursLeft = Math.floor((countDownTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
    let minutesLeft = Math.floor((countDownTime % (1000 * 60 * 60) / (1000 * 60)))
    let secondsLeft = Math.floor((countDownTime % (1000 * 60) / 1000))
    //   console.log(month);

    days.innerHTML = daysLeft + 'd'
    hours.innerHTML = hoursLeft + 'h'
    minutes.innerHTML = minutesLeft + 'm'
    seconds.innerHTML = secondsLeft + 's'

}, 1000)


if (countDownTime >= 0) {
    quiz_body.style.display = 'block'
    wait_time.style.display = 'none'
    document.getElementById('timer').style.display = 'flex'

    let questions = [
        {
            id: 1,
            question: 'Which of the following is the building block of all proteins ?',
            answer: 'amino acids',
            options: {
                a: 'meat and fish',
                b: 'amino acids',
                c: 'nitrogenous bases',
                d: 'DNA'
            }


        },
        {
            id: 2,
            question: 'Nutrients which cannot be synthesized by the body and must be gotten from diet are called ?',
            answer: 'essential nutrients',
            options: {
                a: 'none-essential nutrients',
                b: 'micro nutrients',
                c: 'macro nutrients',
                d: 'essential nutrients'
            }


        },
        {
            id: 3,
            question: 'How are you ?',
            answer: "I'm fine",
            options: {
                a: "I'm not fine",
                b: "I don't know",
                c: "I'm fine",
                d: 'None of the above'
            }


        },
        {
            id: 4,
            question: 'A set of instructions given to a computer as template to carry out a task is called ?',
            answer: "a program",
            options: {
                a: "operating system",
                b: "programming language",
                c: "a program",
                d: 'computer commands'
            }


        },
        {
            id: 5,
            question: 'The Bootstrap framework was built using ?',
            answer: "sass",
            options: {
                a: "java",
                b: "javascript and C++",
                c: "sass",
                d: 'jQuarry'
            }


        },
        {
            id: 6,
            question: 'The Ajax CRUD methods execute at a considerably faster rate than the Fetch method assuming both are carried out under similar network conditions ?',
            answer: "false",
            options: {
                a: "false",
                b: "true",
                c: "true for only Read and Update",
                d: 'true for only Delete'
            }


        }

    ];

    const quizContainer = document.getElementById('quiz')
    const resultContainer = document.getElementById('results')
    const submitButton = document.getElementById('submit')


    function buildQuiz() {
        const html = [];
        questions.forEach((currentQuestion, questionNumber) => {
            const answers_to_thisQuestion = [];
            for (const key in currentQuestion.options) {

                answers_to_thisQuestion.push(
                    `
                        <label>
                            <input type="radio" name="question${questionNumber}" value="${currentQuestion.options[key]}">
                            ${currentQuestion.options[key]}
                        </label>
                    `
                )
            };

            html.push(
                `
                    <div class="slide">
                        <div class="question">${currentQuestion.question}</div>
                        <div class="options">${answers_to_thisQuestion.join('')}</div>
                    </div>
                `
            );
        })

        quizContainer.innerHTML = html.join('')
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.options');
        let score = 0;

        questions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const input = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(input) || {}).value;


            if (userAnswer === currentQuestion.answer) {
                score++
                answerContainers[questionNumber].style.color = 'lightgreen'
            } else {
                answerContainers[questionNumber].style.color = 'red'
            }
        })

        percentageScore = Math.round((score / questions.length) * 100)
        localStorage.setItem('score', JSON.stringify(percentageScore))




        let studentName = JSON.parse(localStorage.getItem('candidate'))
        let studentSchool = JSON.parse(localStorage.getItem('candidateSchool'))
        let quizResult = `${studentSchool}, ${studentName}, ${percentageScore}%`

        localStorage.setItem('result', JSON.stringify(quizResult))

        document.querySelector('.modal-title').innerHTML = `${studentName}, ${studentSchool}: Performance Report`
        document.querySelector('#numCorrectAns').innerHTML = score+'/'+questions.length;
        document.querySelector('#percentScore').innerHTML = percentageScore+'%'
        if(percentageScore>=70){
            document.querySelector('#percentScore').style.color='green'
        }else if(percentageScore<50){
            document.querySelector('#percentScore').style.color='red'
        }else if(percentageScore >=50 || percentageScore <=69){
            document.querySelector('#percentScore').style.color='blue'
        }
        resultContainer.innerHTML = JSON.parse(localStorage.getItem('result'))
    }

    buildQuiz()
    submitButton.addEventListener('click', showResults)

    //SLIDING QUESTIONS
    const previousButton = document.getElementById('previous')
    const nextButton = document.getElementById('next')
    const slides = document.querySelectorAll('.slide')
    let currentSlide = 0

    function timeQuiz() {
        let mins = document.getElementById('mins')
        let secs = document.getElementById('secs')
        let minutes = '01'
        let secs1 = 60
        let secs2 = 60

        mins.innerHTML = minutes
        secs.innerHTML = secs1
        // let twomin= new Date(120000).getMinutes()
        // console.log(twomin);
        let setInterval1 = setInterval(() => {
            secs1 -= 1
            if (secs1 < 10) {
                secs1 = '0' + secs1
            }
            secs.innerHTML = secs1
            // console.log(secs1);
            if (secs1 <= 0) {
                minutes = '00'
                mins.innerHTML = minutes
                secs.innerHTML = secs2

                // secs1 = 0
                clearInterval(setInterval1)
                let setInterval2 = setInterval(() => {
                    secs2 -= 1
                    secs.innerHTML = secs2
                    if (secs2 < 10) {
                        secs2 = '0' + secs2
                    }
                    secs.innerHTML = secs2

                    if (secs2 <= 0) {
                        secs2 = '00'
                        secs.innerHTML = secs2

                        clearInterval(setInterval2)
                        document.getElementById('time_up_message').innerHTML = "Time up"
                        showResults()
                        previousButton.style.display = 'none'
                        nextButton.style.display = 'none'
                        submitButton.style.display = 'none'
                        document.getElementById('view_result').style.display="flex"
                    }
                }, 1000)

            }
        }, 1000)


    }
    timeQuiz()
    function slideShow(x) {
        slides[currentSlide].classList.remove('active-slide');
        slides[x].classList.add('active-slide');
        currentSlide = x;

        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'inline-block'
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block'
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none'
        }
    }
    function nextSlide() {
        slideShow(currentSlide + 1)
    }
    function previousSlide() {
        slideShow(currentSlide - 1)
    }
    slideShow(0)
    previousButton.onclick = () => {
        previousSlide()
    }
    nextButton.onclick = () => {
        nextSlide()
    }
} else {
    schedule_check.innerHTML = `This quiz is scheduled for ${new Date(october1)}`
}


document.querySelector('.logout').onclick=()=>{
    localStorage.removeItem('candidate')
    location.reload()
}
