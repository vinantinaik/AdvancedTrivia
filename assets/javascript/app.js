var questions = [
    {
        id: 1,
        question: "At Dartmouth College in 1964 John Kemeny and Thomas Kurtz invented .... ?",
        answers: {
            a: "ALGOL",
            b: "BASIC",
            c: "FORTRAN",
        },
        correctAnswer: "b"
    },
    {
        id: 2,
        question: "Complete this quote “Computers are useless. They can only give you -------” (Pablo Picasso)",
        answers: {
            a: "numbers",
            b: "headaches",
            c: "answers",
        },
        correctAnswer: "c"
    },
    {
        id: 3,
        question: "Who invented C++ ?",
        answers: {
            a: "Larry Wall",
            b: "Bjarne Stroustrup",
            c: "Alan Cooper",
        },
        correctAnswer: "b"
    },
    {
        id: 4,
        question: "Which of these is not a functional programming language?",
        answers: {
            a: "Fortran",
            b: "LISP",
            c: "F#",
        },
        correctAnswer: "a"
    },
    {
        id: 5,
        question: "A true or false statement put into code that the programmer expects to always be true is an ...",
        answers: {
            a: "exception",
            b: "expression",
            c: "assertion",
        },
        correctAnswer: "c"
    }
    ,
    {
        id: 6,
        question: "A section of code that responds to a particular interaction of the user with a gui control is called a ... ?",
        answers: {
            a: "event handler",
            b: "dispatch function",
            c: "control structure",
        },
        correctAnswer: "a"
    },
    {
        id: 7,
        question: "You could use XSLT to ...",
        answers: {
            a: "speed up database queries",
            b: "transform XML into HTML",
            c: "cache html pages",
        },
        correctAnswer: "b"
    },
    {
        id: 8,
        question: "I define 8 different methods, including CONNECT, PATCH, PUT and POST. I am stateless. I have a four letter name. What am I ?",
        answers: {
            a: "HTML",
            b: "XAML",
            c: "HTTP",
        },
        correctAnswer: "c"
    }

];

var timeLeft;
var unAnsweredCount;
var correctCount;
var wrongCount;
var quizTime;
var intervalID;
var currentQuestion;
var quizCounter;
var userAnswer;



function initializeTrivia() {
    timeLeft = 0;
    unAnsweredCount = 0;
    correctCount = 0;
    wrongCount = 0;
    quizTime = 16;
    quizCounter = 0;
    $("#result").hide();
    $("#currentQuestionResult").hide();
    $("#quizContainer").empty();
    $("#restart").hide();

}

$(document).ready(function () {
    //initialize all trivia variables
    initializeTrivia();

    //when user clicks on start run the timer for the first trivia question
    $('#start').click(function () {
        $(".lead").empty();
        displayQuestion(quizCounter);
    });

    //when user clicks restart reinitialize trivia without reloading
    $("#restart").click(function () {
        initializeTrivia();
        displayQuestion(quizCounter);

    });

    // user clicked on possible answer
    $(document).on("click", "#myList a.list-group-item", function () {

        userAnswer = $(this).attr("data-val");
        displayCurrentAnswer();

    });

    //displays next question
    function displayQuestion() {

        if (quizCounter >= questions.length) {
            displayFinalTriviaScore();
        }
        else {
            userAnswer = undefined;
            clearInterval(intervalID);
            quizTime = 16;

            $("#currentQuestionResult").empty();
            $("#quizContainer").empty();
            getTrivia(questions[quizCounter]);
            quizCounter++;
            run();
        }

    }

    function displayCurrentAnswer() {
        clearInterval(intervalID);

        if (userAnswer === undefined) {
            unAnsweredCount++;
            $("#currentQuestionResult").html("<h3>Out of time!!!</h3>");
            $("#currentQuestionResult").append("<h3>correct answer is : "
                + currentQuestion.answers[currentQuestion.correctAnswer] + "</h3>");
        }
        else if (userAnswer === currentQuestion.correctAnswer) {
            correctCount++;
            $("#currentQuestionResult").html("<h3>Correct!!!</h3>");
        }
        else {
            wrongCount++;
            $("#currentQuestionResult").html("<h3>Nope!!!</h3>"); $("#currentQuestionResult").html("<h3>Nope!!!</h3>");
            $("#currentQuestionResult").append("<h3>correct answer is : "
                + currentQuestion.answers[currentQuestion.correctAnswer] + "</h3>");
        }

        $("#currentQuestionResult").show();

        // let use read the result before displaying next question
        setTimeout(displayQuestion, 1000 * 3);




    }



    //display final score
    function displayFinalTriviaScore() {
        $("#currentQuestionResult").empty();
        $("#quizContainer").empty();

        $("#result").show();
        $("#correct").html("Correct answers : " + correctCount);
        $("#wrong").html("Wrong answers : " + wrongCount);
        $("#unanswered").html("Unanswered : " + unAnsweredCount);
        $("#restart").show();

    }


    //helper methods
    function run() {

        intervalID = setInterval(decrement, 1000);
    }

    function getTrivia(questObj) {
        // we'll need a place to store the HTML output

        currentQuestion = questObj;
        var trivia = [];

        var answers = [];
        for (letter in questObj.answers) {
            // ...add an HTML radio button
            answers.push(
                `<a href="#" class="list-group-item list-group-item-action list-group-item-light" data-val=${letter}> 
                ${questObj.answers[letter]} </a>`
            );

        }

        // add this question and its answers to the quiz
        trivia.push(
            `<div class="list-group"> ${questObj.id}.  ${questObj.question} </div><hr>
            <div class="list-group" id="myList"> ${answers.join('')} </div>`
        );
        // Add question with possible answers 
        $("#quizContainer").html(trivia.join(''));
    }

    function decrement() {
        //Decrement number by one;
        quizTime--;
      
        $("#time-left").html("Time remaining : " + quizTime);

        //if time remaining is zero display current answer and move on to the next question
        if (quizTime === 0) {
            displayCurrentAnswer();
        }
    }




});