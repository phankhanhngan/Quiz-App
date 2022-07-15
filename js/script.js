const btnStart = document.querySelector(".btnStart");
const info_box = document.querySelector(".info_box");
const btnExit = document.querySelector(".btnExit");
const btnContinue = document.querySelector(".btnContinue");
const quiz_box = document.querySelector(".quiz_box");
const question = document.querySelector(".question");
const option_list = document.querySelector(".option_list");
const btnNext = document.querySelector(".btnNext");
const total_question = document.querySelector(".total_question");
const result_box = document.querySelector(".result_box");
const result = document.querySelector(".result");
const btnReplay = document.querySelector(".btnReplay");
const btnQuit = document.querySelector(".btnQuit");
const time_count = document.querySelector(".time_count");
const time_text = document.querySelector(".time_text");
const time_line = document.querySelector(".time_line");

btnStart.onclick = () => {
    info_box.classList.add("activeInfo");
}

btnExit.onclick = () => {
    info_box.classList.remove("activeInfo");
}

let que_count = 0;
let user_score = 0;
let time_val = 15;
let time_val_line = 0;
let counter;
let counterLine;
let tick_tag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let cross_tag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

btnContinue.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    setTimer(time_val);
    setTimerLine(time_val_line);
    showQuestion(que_count);
}

function showQuestion(index) {
    let que_tag = '<span>' + questions[index].number + '. ' + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] +'</span></div>' +
                    '<div class="option"><span>' + questions[index].options[1] +'</span></div>' +
                    '<div class="option"><span>' + questions[index].options[2] +'</span></div>' +
                    '<div class="option"><span>' + questions[index].options[3] +'</span></div>';
                        // <div class="icon tick"><i class="fas fa-check"></i></div></div>
    // <div class="icon cross"><i class="fas fa-xmark"></i></div>
    let total_tag = ' <span><p>' + parseInt(que_count+1) + '</p> of <p>' + questions.length +'</p> Questions</span>';
    question.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    total_question.innerHTML = total_tag;

    const option = document.querySelectorAll(".option");

    //thêm attr onclick vô môi option, khi click thực hiện hàm optionSelected
    option.forEach(opt => {
        opt.setAttribute("onclick","optionSelected(this)");
    });
    btnNext.classList.remove("activeBtnNext");
    btnNext.classList.add("unactiveBtnNext");
}

function showCorrectAnswer() {
    for(let i = 0; i<option_list.children.length; i++) {
        if (option_list.children[i].textContent == questions[que_count].answer) {
            option_list.children[i].classList.add("correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tick_tag);
        }
    }
}

btnNext.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        time_val = 15;
        setTimer(time_val);
        setTimerLine(time_val_line);
        showQuestion(que_count);
    } else {
        quiz_box.classList.remove("activeQuiz");
        result_box.classList.add("activeResult");
        showResult();
    }
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    if (answer.textContent == questions[que_count].answer) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tick_tag);
        user_score++;
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", cross_tag);
        showCorrectAnswer();
    }
    for(let i = 0; i<option_list.children.length; i++) {
        option_list.children[i].classList.add("disable");
    }

    btnNext.classList.remove("unactiveBtnNext");
    btnNext.classList.add("activeBtnNext");
}

function showResult() {
    let announce = '';
    if (user_score < 1) {
        announce = 'And sorry! '
    } else if (user_score <= 3) {
        announce = 'And nice!';
    } else {
        announce = 'And great!';
    }
    let result_tag = '<span>'+ announce + ' You got ' + user_score + ' out of ' + questions.length + '</span>';
    result.innerHTML = result_tag;
}

btnReplay.onclick = () => {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    user_score = 0;
    que_count = 0;
    timeValue = 15; 
    time_val_line = 0;
    clearInterval(counter);
    clearInterval(counterLine);
    setTimer(time_val);
    setTimerLine(time_val_line)
    showQuestion(que_count);
}

btnQuit.onclick = () => {
    window.location.reload();
}

function setTimer(time) {
    time_text.textContent = "Time Left";
    counter = setInterval(() => {
        time--;
        if (time > 0) {
            if (time < 10) {
                time_count.textContent = '0'+time;
            } else {
                time_count.textContent = time;
            }
        } else {
            showCorrectAnswer();
            time_count.textContent = '00';
            clearInterval(counter);
            for(let i = 0; i<option_list.children.length; i++) {
                option_list.children[i].classList.add("disable");
            }
        
            btnNext.classList.remove("unactiveBtnNext");
            btnNext.classList.add("activeBtnNext");
            time_text.textContent = "Time Off";
            btnNext.classList.add("activeBtnNext");
        }
    }, 1000);
}

function setTimerLine(time) {
    counterLine = setInterval(() => {
        time++;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }, 27);
}