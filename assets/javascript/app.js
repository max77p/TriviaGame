document.addEventListener("DOMContentLoaded", function () {
    var startButton = document.createElement("input");
    startButton.value = "start";
    startButton.type = "button";
    startButton.className = "btn btn-primary startBtn";
    document.getElementsByClassName('mainGame')[0].appendChild(startButton);


    startButton.addEventListener("click", function () {
        createObj();//set global variable triviaObj
        run();
        startButton.style.display = "none";//remove button after click start
    })


});//show start button in initial page load

//trivia questions object
var triviaObj;//set triviaObj as global

function createObj() {
    triviaObj = [{

        question: "How many bones are in the human body?",
        correct_answer: "206",
        incorrect_answers: [
            "203",
            "209",
            "200"
        ]
    },

    {
        question: "Which of the following is NOT a word used to describe an earthquake?",
        correct_answer: "Drop-slide",
        incorrect_answers: [
            "Foreshock",
            "Strike-slip",
            "Temblor"
        ]
    },
    {

        question: "What are human nails made of?",
        correct_answer: "Keratin",
        incorrect_answers: [
            "Bone",
            "Chitin",
            "Calcium"
        ]
    },
    {

        question: "What is the largest living organism currently known to man?",
        correct_answer: "Honey Fungus",
        incorrect_answers: [
            "Blue Whale",
            "Redwood Tree",
            "The Coral Reef"
        ]
    }, {

        question: "What is the hottest planet in the Solar System?",
        correct_answer: "Venus",
        incorrect_answers: [
            "Mars",
            "Mercury",
            "Jupiter"
        ]
    },
    {
        question: "Which desert is the only desert in the world where the &quot;Saguaro&quot; cactus grows indigenously?",
        correct_answer: "The Sonoran Desert",
        incorrect_answers: [
            "The Gobi Desert",
            "The Yuma Desert",
            "The Arabian Desert"
        ]

    },
    {

        question: "Burning which of these metals will produce a bright white flame?",
        correct_answer: "Magnesium",
        incorrect_answers: [
            "Copper",
            "Lithium",
            "Lead"
        ]
    },
    {
        question: "Along with Oxygen, which element is primarily responsible for the sky appearing blue?",
        correct_answer: "Nitrogen",
        incorrect_answers: [
            "Helium",
            "Carbon",
            "Hydrogen"
        ]
    },
    {
        question: "Botanically speaking, which of these fruits is NOT a berry?",
        correct_answer: "Strawberry",
        incorrect_answers: [
            "Blueberry",
            "Banana",
            "Concord Grape"
        ]
    },
    {
        question: "What was the first living creature in space?",
        correct_answer: "Fruit Flies",
        incorrect_answers: [
            "Monkey",
            "Dog",
            "Mouse"
        ]
    }

    ]//end of questions array object

    //pick 7 randomly and assign it to triviaObj
    for (let i = triviaObj.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [triviaObj[i], triviaObj[j]] = [triviaObj[j], triviaObj[i]];
    }
    triviaObj.splice(-2);
    numberofQuestions = triviaObj.length;
    //console.log(triviaObj);
}

//createObj();
//console.log(triviaObj);

//all answers in one array
var allAnswerInOne = function (el) {
    var display1 = triviaObj[el].incorrect_answers;
    //console.log(display1);
    var display2 = triviaObj[el].correct_answer;
    //console.log(display2);
    var location = [Math.floor(Math.random() * display1.length)];
    display1.splice(location, 0, display2);
    //console.log(display1);
    return display1;
}




function showGif() {
    var correctMovie = "happy";
    var incorrectMovie = "disappointed"
    //console.log(movie);
    if (correct) {
        var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs&tag=" + correctMovie + "&rating=G";
    }
    else if (incorrect || timesUp) {
        var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs&tag=" + incorrectMovie + "&rating=G";
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var thisGif = response.data['images'].fixed_height['webp'];
        console.log(thisGif);
        var div = document.createElement("div");
        div.className = "gifSection";
        var img = document.createElement("img");
        img.id = "gifImg";
        img.src = thisGif;
        div.appendChild(img);
        document.getElementsByClassName('mainGame')[0].appendChild(div);
    });
}//get random gif related to correct/incorrect answer




var intervalId;
var number;
var currentDataValue;

//var numberofQuestions = triviaObj.length;
var numberofQuestions;
var currentQuestion = 0;
var gamerestart;

function run() {
    $(".gifSection").remove();
    timesUp = false;
    //console.log(currentQuestion === numberofQuestions);
    if (currentQuestion === numberofQuestions) {
        endofGame();
        currentDataValue = 0;
        return;

    }

    number = 20;
    $('#mainQuestion').empty();
    $('.answers').remove();

    //currentDataValue = triviaObj[currentQuestion].display();

    currentDataValue = allAnswerInOne(currentQuestion);


    //console.log(currentDataValue);
    clearInterval(intervalId);
    setTimeout(function () {
        intervalId = setInterval(decrement, 1000);
        decrement();
        listAnswer();
    }, 0);


}//end of run function

function decrement() {
    number--;
    $("#timeRemaining").html("<h2> Time Remaining: " + number + "</h2>");
    if (number == 0) {
        clearInterval(intervalId);
    }
    if (number === 0 && !correct && !incorrect) {
        console.log("test");
        unansweredCount++;
        clearInterval(intervalId);
        timesUp = true;
        itirateQuestions(triviaObj[currentQuestion].correct_answer);
    }
}//end of decrement function


//list potential answers
function listAnswer() {

    //console.log(triviaObj[0].incorrect_answers.push(triviaObj[0].correct_answer));
    //TODO send answer array to the divs
    //var length = triviaObj[currentQuestion].incorrect_answers.length;///////////////////////
    var length = currentDataValue.length;
    //console.log(length);
    var questionDiv = document.getElementById('mainQuestion');
    var h2 = document.createElement('h2');
    h2.id = "questionTitle";
    questionDiv.appendChild(h2);
    h2.innerHTML = triviaObj[currentQuestion].question;


    var wheretoinsert = document.getElementsByClassName('row');
    //console.log(wheretoinsert);

    for (var i = 0; i < length; i++) {
        //console.log(i);
        var answerDiv = document.createElement("div");
        answerDiv.className = "col-md-6 answers";//create columns for bootstrap
        var h3 = document.createElement('h3');
        h3.className = "answerSection";
        h3.innerHTML = currentDataValue[i];//holds correct and incorrect due to object function
        answerDiv.appendChild(h3);
        if (i < 2) {
            wheretoinsert[0].appendChild(answerDiv);//put into respective rows for bootstrap
        }
        else if (i >= 2) {
            wheretoinsert[1].appendChild(answerDiv);//put into respective rows for bootstrap
        }
    }

    //put answer value to each potential answer div
    var div = document.getElementsByClassName("answers");
    for (var i = 0; i < currentDataValue.length; i++) {
        div[i].setAttribute("data-value", currentDataValue[i]);
    }

    //TODO-onhover style the answersection
    styleAnswer();

    //TODO-clickanswer
    checkAnswer();


}




function styleAnswer() {//complete
    var div = document.getElementsByClassName('answers');
    //console.log(div);
    for (var i = 0; i < div.length; i++) {
        div[i].addEventListener('mouseover', function () {
            this.style.border = "1px solid grey";
            this.style.backgroundColor = "#f5bf42";

        });
        div[i].addEventListener('mouseout', function () {
            this.style.border = "";
            this.style.backgroundColor = "";
        });
    }
};


//TODO - set boolean if answer is correct
var correct;
//TODO - set boolean if answer is wrong
var incorrect;
//TODO- set boolean for next question regardless of correct or wrong
var nextQuestion = false;

//TODO- set boolean for not clicked
var clicked;

//TODO - set boolean for if no answer is clicked
var timesUp;

function checkAnswer() {
    correct = false;
    incorrect = false;
    var div = document.getElementsByClassName('answers');
    //console.log(div.length);
    for (var i = 0; i < div.length; i++) {
        div[i].addEventListener("click", function () {
            //console.log(el);
            if (this.getAttribute("data-value") === triviaObj[currentQuestion].correct_answer) {
                console.log(("correct!"));
                correct = true;
                correctCount++;
                itirateQuestions(triviaObj[currentQuestion].correct_answer);
            }
            else if (this.getAttribute("data-value") != triviaObj[currentQuestion].correct_answer) {
                console.log("wrong");
                incorrect = true;
                incorrectCount++
                itirateQuestions(triviaObj[currentQuestion].correct_answer);
            }

        });

    }//end of for loop
};//end of checkAnswer


//TODO-show screen if correct/incorrect/time is up
function showScreenAfterSelection(element) {
    $('#mainQuestion').empty();
    $('.answers').remove();
    var div = document.createElement("div");
    div.className = "afterSection";
    var h2 = document.createElement('h2');
    h2.id = "answerSection";
    div.appendChild(h2);
    document.getElementsByClassName('mainGame')[0].appendChild(div);
    var h3 = document.createElement('h3');


    if (correct) {
        h2.innerHTML = "Correct!";
        h3.id = "correctInfo";
        div.appendChild(h3);
        document.getElementsByClassName('mainGame')[0].appendChild(div);
        showGif();
    }
    if (incorrect) {
        h2.innerHTML = "Incorrect!";
        h3.id = "incorrectInfo";
        div.appendChild(h3);
        h3.innerHTML = "The correct answer was " + element;
        document.getElementsByClassName('mainGame')[0].appendChild(div);
        showGif();
    }
    if (timesUp) {
        h2.innerHTML = "Time is up!";
        h3.id = "incorrectInfo";
        div.appendChild(h3);
        h3.innerHTML = "The correct answer was " + element;
        document.getElementsByClassName('mainGame')[0].appendChild(div);
        showGif();
    }

}


//TODO-itirate questions
function itirateQuestions(el) {
    if (correct) {
        showScreenAfterSelection(el);
        setTimeout(function () {
            $('.afterSection').remove();
            currentQuestion++;
            run();
        }, 4000);

    }
    if (incorrect) {
        showScreenAfterSelection(el);
        setTimeout(function () {
            $('.afterSection').remove();
            currentQuestion++;
            run();
        }, 4000);

    }

    if (timesUp) {
        showScreenAfterSelection(el);
        setTimeout(function () {
            $('.afterSection').remove();
            currentQuestion++;
            run();
        }, 4000);

    }

}

//create starover page
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;

function endofGame() {
    //$('#timeRemaining').remove();
    //gameEnded = true;
    $('#timeRemaining').hide();//hide timecount when its end of game

    var div = document.createElement("div");
    div.className = "gameEnd";
    var h2 = document.createElement('h2');
    h2.id = "endSection";
    h2.innerHTML = "All done, heres how you did!";
    div.appendChild(h2);
    document.getElementsByClassName('mainGame')[0].appendChild(div);//append hows you did title

    var h3 = document.createElement("h3");
    h3.className = "scoreCount";
    h3.innerHTML = "Correct Answers: " + correctCount;
    div.appendChild(h3);
    document.getElementsByClassName('mainGame')[0].appendChild(div);

    var h3 = document.createElement("h3");
    h3.className = "incorrectCount";
    h3.innerHTML = "Incorrect Answers: " + incorrectCount;
    div.appendChild(h3);
    document.getElementsByClassName('mainGame')[0].appendChild(div);

    var h3 = document.createElement("h3");
    h3.className = "unansweredCount";
    h3.innerHTML = "Unanswered: " + unansweredCount;
    div.appendChild(h3);
    document.getElementsByClassName('mainGame')[0].appendChild(div);

    var endButton = document.createElement("input");
    endButton.value = "Start Over?";
    endButton.type = "button";
    endButton.className = "btn btn-primary endBtn";
    document.getElementsByClassName('mainGame')[0].appendChild(endButton);

    endButton.addEventListener('click', function (event) {
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        currentQuestion = 0;
        $('.gameEnd').remove();
        createObj();
        $('#timeRemaining').show();//show timecount again after user presses restart
        run();
        $('.endBtn').remove();
        console.log(currentDataValue);
    });

}








  //TODO: create object of trivia questions-done
  //TODO: show trivia questions on screen - done
  //TODO: set timer before game switches to next question - done
  //TODO: at end of time switch trivia questions -maybe use for loop on object -done
