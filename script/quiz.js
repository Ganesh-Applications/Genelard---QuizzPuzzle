let selectedQuiz = null;
let currentQuestionIndex = -1;
let numQuestions = null;
let questionContainer = $("#question-container");
let score = 0;

$("#level-selector .level-btn").on("click touch", onSelectLevel);

$(document).on("click touch", ".answers .answer-btn:not(.unclickable)", onClickAnswer);

$("#go-to-puzzle-btn").on("click touch", onClickGoToPuzzle);

$('#dark-overlay').fadeOut(1000);

function onSelectLevel()
{
        let selectedBtn = $(this);
        let selectedLevel = selectedBtn.data("level");
        selectedQuiz = Quiz.find(q => q.level === selectedLevel);

        numQuestions = selectedQuiz.questions.length

        $("#level-selector").addClass("hidden");

        startQuiz();
}

function startQuiz()
{
        console.log('Démarrage du quiz pour le niveau : ' + selectedQuiz.level);

        showNextQuestion();
        questionContainer.removeClass("hidden");
}

function showNextQuestion()
{
        //-- Change la question courante
        currentQuestionIndex++;

        console.log('Affichage de la question ' + (currentQuestionIndex));

        //-- Récupère la question dans les datas
        let nextQuestion = selectedQuiz.questions[currentQuestionIndex];

        //-- Affiche la question
        let title = currentQuestionIndex + 1 + ". " + nextQuestion.title;
        questionContainer.find('.title').text(title);
        questionContainer.find('.answers').empty();

        //-- Pour chaque réponse, crée un bouton
        for(let answerKey in nextQuestion.answers)
        {
                let className = "btn answer-btn";
                if (answerKey === nextQuestion.correct)
                        className += " correct-answer";

                let answerText = nextQuestion.answers[answerKey];

                let answerBtn = $(`<button class="${className}" data-answer-index="${answerKey}">${answerText}</button>`);

                questionContainer.find('.answers').append(answerBtn);
        }
}

function onClickAnswer()
{
        let selectedAnswerElt = $(this);
        let isCorrect = selectedAnswerElt.hasClass("correct-answer");

        //-- Désactive les boutons de réponses
        let answerButtons =$(".answers .answer-btn")
        answerButtons.off("click touch");
        answerButtons.addClass("unclickable");

        //-- Si la réponse est juste
        if (isCorrect)
        {
                console.log("Bonne réponse !");

                //-- Affiche la bonne réponse en vert
                selectedAnswerElt.addClass("success");

                //-- Incrémente le score
                score++;
        }
        //-- Si la réponse est fausse
        else
        {
                console.log("Mauvaise réponse !");

                //-- Affiche la bonne réponse en vert et la mauvaise en rouge
                selectedAnswerElt.addClass("failure");
                $(this).parent().find(".correct-answer").addClass("success");
        }

        //-- Attend avant de passer à la suite
        setTimeout(function()
                {
                        //-- Si il y a une question suivant on l'affiche
                        if (currentQuestionIndex < numQuestions - 1)
                                showNextQuestion();
                        //-- Sinon on pass à la fin du quiz
                        else
                                endQuiz();
                }
        , 1500);
}

function endQuiz()
{
        console.log("Fin du quiz !");

        questionContainer.addClass("hidden");
        $("#end-screen").removeClass("hidden");

        let isSuccess = score >= numQuestions/2;

        $("#end-screen .score .score-value")
                .addClass(isSuccess ? "success" : "failure")
                .html(score + '<span class="antislash">/</span>');
        $("#end-screen .score .num-questions").text(numQuestions);

        let text = "";

        for (let scoreForText in ResultsTexts[selectedQuiz.level])
        {
                if (score >= scoreForText)
                        text = ResultsTexts[selectedQuiz.level][scoreForText];
                else
                        break;
        }

        $("#end-screen .result-text").html(text);

        setTimeout(() => location.href = "/index.html", 10000); //<- On quitte le quiz après 10 secondes
}

function onClickGoToPuzzle()
{
        //-- Si on avait pas commencé le quiz, on retourne direct au puzzle
        if (currentQuestionIndex == -1)
        {
                goToPuzzle();
                return;
        }

        //-- Sinon on affiche une modale de confirmation
        console.log("Affichage de la modale de confirmation");
        let modal = $("#quit-modal");
        let overlay = $("#overlay");

        modal.fadeIn(300);
        overlay.fadeIn(300);

        modal.find(".cancel-quit").on("click touch", function() {
                modal.fadeOut(300);
                overlay.fadeOut(300);
        });

        modal.find(".confirm-quit").on("click touch", function() {
                goToPuzzle();
        });
}

function goToPuzzle()
{
        $('#overlay').fadeIn(1000);
        setTimeout(() => {
            window.location.href = "/html/puzzle.html";
        }, 1200);
}