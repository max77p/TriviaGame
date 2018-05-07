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


});




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


console.log(triviaObj[0].display1);


var intervalId;
var number;

var numberofQuestions = triviaObj.length;
var currentQuestion = 0;

function run() {
    console.log(currentQuestion === numberofQuestions);
    if (currentQuestion === numberofQuestions) {
        return;
    }

    number = 5;
    $('.title').remove();
    $('.answers').remove();



    
    currentDataValue = triviaObj[currentQuestion].display();

    console.log(currentDataValue);
    setTimeout(function () {
        listAnswer();
        decrement();
        //clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);

    }, 0);


}

function decrement() {
    number--;
    $("#timeRemaining").html("<h2> Time Remaining: " + number + "</h2>");

    if (number === 0) {
        clearInterval(intervalId);

    }
}


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

function checkAnswer() {
    correct = false;
    incorrect = false;
    var div = document.getElementsByClassName('answers');
    console.log(div.length);
    for (var i = 0; i < div.length; i++) {
        div[i].addEventListener("click", function () {

            if (this.getAttribute("data-value") === triviaObj[currentQuestion].correct_answer) {
                console.log(("correct!"));
                correct = true;
                itirateQuestions(triviaObj[currentQuestion].correct_answer);
            }
            else {
                console.log(alert("wrong"));
                incorrect = true;
                //itirateQuestions();
            }

        });
    }
};


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
    }
    if (incorrect) {
        h2.innerHTML = "Incorrect!";
        h3.id = "incorrectInfo";
        div.appendChild(h3);
        h3.innerHTML = "The correct answer was " + element;
        document.getElementsByClassName('mainGame')[0].appendChild(div);
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


}





  //TODO: create object of trivia questions-done
  //TODO: show trivia questions on screen
  //TODO: set timer before game switches to next question
  //TODO: at end of time switch trivia questions -maybe use for loop on object
  //TODO: