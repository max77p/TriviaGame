document.addEventListener("DOMContentLoaded", function () {
    var startButton = document.createElement("input");
    startButton.value = "start";
    startButton.type = "button";
    startButton.className = "btn btn-primary startBtn";
    document.getElementsByClassName('mainGame')[0].appendChild(startButton);


    startButton.addEventListener("click", function () {
        run();
        startButton.style.display = "none";//remove button after click start
    })


});//show start button in initial page load




//trivia questions object
var currentDataValue;

var triviaObj = [{

    question: "How many bones are in the human body?",
    correct_answer: "206",
    incorrect_answers: [
        "203",
        "209",
        "200"
    ],
    getGif: "skeleton",

    display: function () {
        var display1 = this.incorrect_answers;
        var display2 = this.correct_answer;
        var location = [Math.floor(Math.random() * display1.length)];
        display1.splice(location, 0, display2);
        return display1;
    }

},

{
    question: "Which of the following is NOT a word used to describe an earthquake?",
    correct_answer: "Drop-slide",
    incorrect_answers: [
        "Foreshock",
        "Strike-slip",
        "Temblor"
    ],
    getGif: "earthquake",

    display: function () {
        var display1 = this.incorrect_answers;
        var display2 = this.correct_answer;
        var location = [Math.floor(Math.random() * display1.length)];
        display1.splice(location, 0, display2);
        return display1;
    }

},
{

    question: "What are human nails made of?",
    correct_answer: "Keratin",
    incorrect_answers: [
        "Bone",
        "Chitin",
        "Calcium"
    ],
    getGif: "human+nail",
    display: function () {
        var display1 = this.incorrect_answers;
        var display2 = this.correct_answer;
        var location = [Math.floor(Math.random() * display1.length)];
        display1.splice(location, 0, display2);
        return display1;
    }
},
{

    question: "What is the largest living organism currently known to man?",
    correct_answer: "Honey Fungus",
    incorrect_answers: [
        "Blue Whale",
        "Redwood Tree",
        "The Coral Reef"
    ],
    getGif: "honey fungus",

    display: function () {
        var display1 = this.incorrect_answers;
        var display2 = this.correct_answer;
        var location = [Math.floor(Math.random() * display1.length)];
        display1.splice(location, 0, display2);
        return display1;
    }
}, {

    question: "What is the hottest planet in the Solar System?",
    correct_answer: "Venus",
    incorrect_answers: [
        "Mars",
        "Mercury",
        "Jupiter"
    ],
    display: function () {
        var display1 = this.incorrect_answers;
        var display2 = this.correct_answer;
        var location = [Math.floor(Math.random() * display1.length)];
        display1.splice(location, 0, display2);
        return display1;
    }
},
{
    question: "Which desert is the only desert in the world where the &quot;Saguaro&quot; cactus grows indigenously?",
    correct_answer: "The Sonoran Desert",
    incorrect_answers: [
        "The Gobi Desert",
        "The Yuma Desert",
        "The Arabian Desert"
    ],
    display: function () {
        var display1 = this.incorrect_answers;
        var display2 = this.correct_answer;
        var location = [Math.floor(Math.random() * display1.length)];
        display1.splice(location, 0, display2);
        return display1;
    }

},
{

    question: "Burning which of these metals will produce a bright white flame?",
    correct_answer: "Magnesium",
    incorrect_answers: [
        "Copper",
        "Lithium",
        "Lead"
    ],
    display: function () {
        var display1 = this.incorrect_answers;
        var display2 = this.correct_answer;
        var location = [Math.floor(Math.random() * display1.length)];
        display1.splice(location, 0, display2);
        return display1;
    }
}

]//end of questions array object


function showGif() {
    var correctMovie = "happy";
    var incorrectMovie = "disappointed"
    //console.log(movie);
    if (correct) {
        var queryURL = "http://api.giphy.com/v1/gifs/random?&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs&tag=" + correctMovie + "&rating=G";
    }
    else if (incorrect || timesUp) {
        var queryURL = "http://api.giphy.com/v1/gifs/random?&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs&tag=" + incorrectMovie + "&rating=G";
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

//console.log(triviaObj[0].display1);


var intervalId;
var number;

var numberofQuestions = triviaObj.length;
var currentQuestion = 0;

function run() {
    $(".gifSection").remove();
    timesUp = false;
    console.log(currentQuestion === numberofQuestions);
    if (currentQuestion === numberofQuestions) {
        endofGame();
        return;

    }

    number = 5;
    $('.title').remove();
    $('.answers').remove();

    currentDataValue = triviaObj[currentQuestion].display();

    console.log(currentDataValue);
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
    var length = triviaObj[currentQuestion].incorrect_answers.length;
    console.log(length);
    var questionDiv = document.createElement("div");
    questionDiv.className = "title";
    var h2 = document.createElement('h2');
    h2.id = "questionTitle";
    questionDiv.appendChild(h2);
    h2.innerHTML = triviaObj[currentQuestion].question;
    document.getElementsByClassName('mainGame')[0].appendChild(questionDiv);

    for (var i = 0; i < length; i++) {
        var answerDiv = document.createElement("div");
        answerDiv.className = "answers";
        var h3 = document.createElement('h3');
        h3.className = "answerSection";
        answerDiv.appendChild(h3);
        h3.innerHTML = triviaObj[currentQuestion].incorrect_answers[i];
        document.getElementsByClassName('mainGame')[0].appendChild(answerDiv);

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
    console.log(div);
    for (var i = 0; i < div.length; i++) {
        div[i].addEventListener('mouseover', function () {
            this.style.backgroundColor = "yellow";

        });
        div[i].addEventListener('mouseout', function () {
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
    $('.title').remove();
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
        }, 3000);

    }
    if (incorrect) {
        showScreenAfterSelection(el);
        setTimeout(function () {
            $('.afterSection').remove();
            currentQuestion++;
            run();
        }, 3000);

    }

    if (timesUp) {
        showScreenAfterSelection(el);
        setTimeout(function () {
            $('.afterSection').remove();
            currentQuestion++;
            run();
        }, 3000);

    }

}

//create starover page
var correctCount=0;
var incorrectCount=0;
var unansweredCount=0;

function endofGame() {
    var div = document.createElement("div");
    div.className = "gameEnd";
    var h2 = document.createElement('h2');
    h2.id = "endSection";
    h2.innerHTML = "All done, heres how you did!";
    div.appendChild(h2);
    document.getElementsByClassName('mainGame')[0].appendChild(div);//append hows you did title

    var h3=document.createElement("h3");
    h3.className="scoreCount";
    h3.innerHTML="Correct Answer: " + correctCount;
    div.appendChild(h3);
    document.getElementsByClassName('mainGame')[0].appendChild(div);
    

}




  //TODO: create object of trivia questions-done
  //TODO: show trivia questions on screen - done
  //TODO: set timer before game switches to next question - done
  //TODO: at end of time switch trivia questions -maybe use for loop on object -done
