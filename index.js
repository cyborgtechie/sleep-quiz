const STORE = [
  //question 1
  {
    question: "How many times a day is your body programmed to feel sleepy?",
    answers: ["One", "Two", "Three", "Five"],
    correctAnswer: "Two"
  },
  //question 2
  {
    question: "T or F: About half your sleeping hours are spent dreaming",
    answers: ["True", "False"],
    correctAnswer: "False"
  },
  //question 3
  {
    question: "Which of the following is the most common cause of nightmares?",
    answers: [
      "Stress and anxiety",
      "Eating before bed",
      "Drinking too much alcohol",
      "Sleeping in a cold room"
    ],
    correctAnswer: "Stress and anxiety"
  },
  //question 4
  {
    question: "Which of the following can happen when you sleepwalk?",
    answers: [
      "Eating",
      "Driving to Chiptole",
      "Re-decorating the house",
      "All of the above"
    ],
    correctAnswer: "All of the above"
  },
  //question 5
  {
    question: "How long does it take to reach REM sleep?",
    answers: ["10 minutes", "5 minutes", "90 minutes", "60 minutes"],
    correctAnswer: "90 minutes"
  },
  //question 6
  {
    question:
      "Which stage in the sleep cycle are dreams usually the most vivid?",
    answers: [
      "NREM sleep",
      "Second sleep cycle",
      "Fourth sleep cycle",
      "REM sleep"
    ],
    correctAnswer: "REM sleep"
  },
  //question 7
  {
    question:
      "T or F: People who are naturally more awake and alert may be more likely to suffer from insomnia",
    answers: ["True", "False"],
    correctAnswer: "True"
  }
];

//these variables will hold score and question values
let currentScore = 0;
let questionNum = 0;

//function to iterate through all questions and check if user has gone through all of them
function renderQuestion() {
  if (questionNum < STORE.length) {
    renderQuestAns(questionNum);
  } else {
    $("questionNumber").text(7);
    results();
  }
}

//function to give functionality to the start button, will increase question number by 1
function startQuiz() {
  $(".startButton").on("click", function(event) {
    event.preventDefault;
    $(".questionNumber").text(1);
    renderQuestion();
  });
}

//function to render questions and choices for the user
function renderQuestAns(questions) {
  let showQuestion = $(`
   <form class="question-form">
    <section class="quiz-bg">
      <fieldset name="start-quiz">
        <legend class="zzz">zZz</legend>
      <h2 class="question-text">${STORE[questions].question}</h2>
      </fieldset>
    </section>
  </form>
  `);

  let showChoices = $(showQuestion).find("fieldset");
  STORE[questions].answers.forEach(function(ans, qindex) {
    $(`<span class="choices"><input class="radio" type="radio" 
    id="${qindex}"
    value="${ans}" 
    name="answer" required>${ans}</span>`).appendTo(showChoices);
  });
  $(`<button type="button" class="submitButton">Submit</button>`).appendTo(
    showChoices
  );
  $(".display").html(showQuestion);
}

//will increment the question number as the user progresses through the quiz
function incQuestion() {
  questionNum++;
  $(".questionNumber").text(questionNum + 1);
}

//will increment the score by one, every time the user gets the correct answer
function incScore() {
  currentScore++;
  $(".score").text(currentScore);
}

//will check the value of the users choice compared to the correctAnswer,
function choiceVal() {
  $("body").on("click", ".submitButton", function(event) {
    event.preventDefault();
    let userChoice = $("input[name=answer]:checked").val();
    if (!userChoice) {
      alert("Pick a choice in order to continue.");
      return;
    }
    let correctChoice = STORE[questionNum].correctAnswer;
    if (userChoice === correctChoice) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//will check if the answer is correct, if yes will display happy gif else display correct answer & sad gif
function correctAnswer() {
  let correctOutput = $(`
    <form class="answer-output">
    <section class="quiz-bg">
        <fieldset name="start-quiz">
        <legend class="zzz">zZz</legend>
            <h3 class="correct-text">Your answer is correct!</h3>
            <img src="imgs/right.gif" alt="sleeping guy woken up by clapping audience" class="reactions"><br>
            <button type="button" class="nextButton">Next</button>
        </fieldset>
      </section>  
    </form>  
    `);
  incScore();
  $(".display").html(correctOutput);
}
function wrongAnswer() {
  let wrongOutput = $(`
    <form class="answer-output">
      <section class="quiz-bg">
        <fieldset>
        <legend class="zzz">zZz</legend>
            <h3 class="wrong-text">Your answer is incorrect sleepyhead...</h3> 
            <img src="imgs/wrong.gif" alt="baby falling sleep" class="reactions">
            <p class="wrong-p">The correct answer is:</p>
            <p class="correction">${STORE[questionNum].correctAnswer}</p> 
            <button type="button" class="nextButton">Next</button>
        </fieldset>
      </section>  
    </form>
    `);
  $(".display").html(wrongOutput);
}

//function for next question
function nextQuestionIndex() {
  $("body").on("click", ".nextButton", function(event) {
    event.preventDefault();
    incQuestion();
    renderQuestion();
  });
}

//will display the results and final score
function results() {
  const high = ["Great job!", "imgs/high.gif", "woman waking up happy"];
  const low = ["Take a nap and try again", "imgs/low.gif", "unhappy man"];
  if (currentScore >= 5) {
    final = high;
  } else {
    final = low;
  }
  return finalResults();

  //this function renders the final form, which will display the users results
  function finalResults() {
    return (finalScore = $(".display").html(`
      <form class="finalForm">
        <section class="quiz-bg">
            <fieldset class="finalForm">
                <legend class="zzz">zZz</legend>
                <h2 class="results-text">${final[0]}</h2><br>
                <img src="${final[1]}" alt="${final[2]}" class="reactions"> 
                <h2 class="results-text">Your score is:<br>${currentScore}/7!</h2>
                <br>
                <button type="button" class="restart">Restart Quiz</button>
            </fieldset>
         </section>
        </form>   
        `));
  }
}

//resets score when user restarts quiz
function resetScore() {
  currentScore = 0;
  questionNum = 0;
  $(".score").text(0);
  $(".questionNumber").text(0);
}
function showHomeScreen() {
  let home = $(`
  <form class="quiz">
  <section class="quiz-bg">
  <fieldset name="start-quiz">
   <legend class="text">zZz</legend>
   <h2 class="summary">
     How much do you know about sleep? Test your knowledge of sleep
     deprivation, insomnia, dreams, and nightmares!
   </h2>
   <button type="button" class="startButton">START QUIZ</button>
 </fieldset>
 </section>
</form>`);
  $(".display").html(home);
}
//function to allow user to restart the quiz
function restartQuiz() {
  $("body").on("click", ".restart", function(event) {
    event.preventDefault();
    showHomeScreen();
    resetScore();
    startQuiz();
  });
}
//function to run quiz
function sleepQuiz() {
  startQuiz();
  choiceVal();
  nextQuestionIndex();
  restartQuiz();
}
$(sleepQuiz);
