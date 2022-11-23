//STUDENT REGISTRATION/LOGIN VARIABLES
let register_student = document.getElementById('register-student')
let student_login = document.getElementById('student_login')
let student_name = document.getElementById('student-name')
let student_gender = document.getElementById('gender')
let student_age = document.getElementById('student-age')
let student_school = document.getElementById('student-school')
let student_email = document.getElementById('student-email')
let student_password = document.getElementById('password')

let login_email = document.getElementById('login_email')
let login_password = document.getElementById('login_password')

//SCHOOL REGISTRATION VARIABLES
let school_name = document.getElementById('school_name')
let school_address = document.getElementById('school_address')
let school_email = document.getElementById('school_email')
let register_school = document.getElementById('register_school')

//HTML SECTIONS VARIABLES
let login_section = document.getElementById('login_section')
let register_school_section = document.getElementById('register_school_section')
let register_student_section = document.getElementById('register_student_section')


class Candidate {
    constructor(a, b, c, d, e, f) {
        this.student_name = a,
            this.student_gender = b,
            this.student_age = c,
            this.student_school = d
        this.student_email = e
        this.student_password = f
    }

    takeQuiz() {
        let loginStatus = localStorage.getItem('candidate')
        if (loginStatus) {
            location.href = 'newquiz.html'
        }
    }
    getPoint() {
        console.log(this.student_name + " has no points yet");
    }
}
class School {
    constructor(a, b, c) {
        this.school_name = a,
            this.school_address = b,
            this.school_email = c
    }
}
register_student.onclick = (e) => {
    e.preventDefault()

    //VALIDATING INPUT FIELDS BEFORE OPERATION
    let student_inputs = document.querySelectorAll('.student-inputs')
    let empty = 1;
    for (let i = 0; i < student_inputs.length; i++) {
        let input = student_inputs[i];
        if (input.value === '' || input.value === null || input.value === "Select your school") {
            empty -= 1
            input.nextElementSibling.innerHTML = input.previousElementSibling.innerHTML + "is required to register"
        } else {
            input.nextElementSibling.innerHTML = ''
            empty += 1
        }
    }

    //OPERATION CARRIED OUT HERE
    if (empty === 7) {
        let candidate = new Candidate(
            student_name.value,
            student_gender.value,
            student_age.value,
            student_school.value,
            student_email.value,
            student_password.value
        )
        //Check candidate details against database for existing email and reject a second attempt to use same
        let currentStudents;
        fetch('http://localhost:4000/students').then((resp) => resp.json()).then((data) => {
            currentStudents = data.filter(({ student_email }) => candidate.student_email === student_email)

            if (!currentStudents[0]) {
                fetch('http://localhost:4000/students', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(candidate)
                })
                alert(student_name.value + " has been registered successfully, Proceed to login to take quiz")

                student_name.value = ''
                student_gender.value = ''
                student_age.value = ''
                student_school.value = ''
                student_email.value = ''
                student_password.value = ''

                login_section.style.display = "block"
                register_school_section.style.display = "none"
                register_student_section.style.display = "none"

            } else {
                alert('A student with this email already exists, kindly use another email to register')


            }
            // currentStudents.forEach(({ student_email, student_password }) => {
            //     if (candidate.student_email === student_email) {
            //     } else {
            //         fetch('http://localhost:4000/students', {
            //             method: 'post',
            //             headers: { 'Content-Type': 'application/json' },
            //             body: JSON.stringify(candidate)
            //         })
            //         alert(student_name.value + " has been registered successfully")

            //     }
            // })

        }).catch((error) => {
            console.log(error);
        })


    }

}

register_school.onclick = (e) => {
    e.preventDefault()

    //VALIDATING INPUT FIELDS BEFORE OPERATION BEGINS
    let school_inputs = document.querySelectorAll('.school-inputs')
    let empty = 1;

    for (let i = 0; i < school_inputs.length; i++) {
        let anyInput = school_inputs[i];
        if (anyInput.value === '' || anyInput.vaue === null) {
            anyInput.nextElementSibling.innerHTML = anyInput.previousElementSibling.innerHTML + " is required to register"
            empty -= 1
        } else {
            anyInput.nextElementSibling.innerHTML = ""
            empty += 1
        }
    }
    //OPERATION BEGINS HERE
    if (empty === 4) {
        let school = new School(
            school_name.value,
            school_address.value,
            school_email.value,
        )
        fetch('http://localhost:4000/schools', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(school)
        }).then(() => {
            alert(school_name.value + " has been registered successfully")
            school_name.value = ''
            school_address.value = ''
            school_email.value = ''
        })
    }


}

const getStudents = async () => {
    const rawStudents = await fetch('http://localhost:4000/students')
    const data = await rawStudents.json()
    let loggedInStudent;
    /*
    data.forEach((main_data) => {


        loggedInStudent=main_data
            if (login_email.value === loggedInStudent.student_email && login_password.value === loggedInStudent.student_password) {
        loggedInStudent = main_data
        alert('Hello, ' + loggedInStudent.student_name + ' welcome to your quiz page. Click okay to continue')

        new Candidate(
            loggedInStudent.student_name,
            loggedInStudent.student_school,
            loggedInStudent.student_email,
            loggedInStudent.student_school
        ).takeQuiz()
        

    } else {
        getSchools()
        // alert('wrong email orlfvldf')
        console.log('wrong');
    }

    })
*/

    const studentA = data.filter(({ student_email, student_password }) => login_email.value === student_email && login_password.value === student_password)
    if (studentA[0]) {
        loggedInStudent = studentA[0]
        alert('Hello, ' + loggedInStudent.student_name + ' welcome to your quiz page. Click okay to continue')
        localStorage.setItem('candidate', JSON.stringify(loggedInStudent.student_name))
        localStorage.setItem('candidateSchool', JSON.stringify(loggedInStudent.student_school))
    } else {
        alert('Wrong email address or password')
    }

    new Candidate(loggedInStudent).takeQuiz()

}
const getSchools = async () => {
    try {
        const rawSchools = await fetch('http://localhost:4000/schools')
        const data = await rawSchools.json()

        function populateSchools() {
            let option = '';
            for (let i = 0; i < data.length; i++) {
                option += `<option value="${data[i].school_name}">${data[i].school_name}</option>`
            }
            return option
        }
        student_school.innerHTML = populateSchools(data)
    } catch (error) {
        console.log(error)
    }
}
getSchools()
student_login.onclick = (e) => {
    e.preventDefault()
    let loginInputs = document.querySelectorAll('.login-inputs')
    let empty = 1;
    for (let i = 0; i < loginInputs.length; i++) {
        if (loginInputs[i].value === '' || loginInputs[i].value === null) {
            loginInputs[i].nextElementSibling.innerHTML = loginInputs[i].previousElementSibling.innerHTML + " is required to login"
            empty -= 1
        } else {
            loginInputs[i].nextElementSibling.innerHTML = ""
            empty += 1
        }
    }

    console.log(empty);
    if (empty === 3) {
        getStudents()
    }


}


function htmlDisplay() {
    let login = document.getElementById('login')
    let registerSchool = document.getElementById('school_registration')
    let registerStudent = document.getElementById('student_registration')



    login.onclick = () => {
        login_section.style.display = "block"
        register_school_section.style.display = "none"
        register_student_section.style.display = "none"
    }
    registerSchool.onclick = () => {
        login_section.style.display = "none"
        register_school_section.style.display = "block"
        register_student_section.style.display = "none"
    }
    registerStudent.onclick = () => {
        login_section.style.display = "none"
        register_school_section.style.display = "none"
        register_student_section.style.display = "block"
    }


}
htmlDisplay()



let sept25 = 1664103540000;

// let schedule_check = document.getElementById('schedule_check')
// let quiz_body = document.getElementById('quiz_body')
let wait_time = document.getElementById('wait_tim')
let days = document.getElementById('days')
let hours = document.getElementById('hours')
let minutes = document.getElementById('minutes')
let today = new Date().getTime()

let countDownTime = sept25 - today

let timer = setInterval(() => {
    let today = new Date().getTime()
    let countDownTime = sept25 - today

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