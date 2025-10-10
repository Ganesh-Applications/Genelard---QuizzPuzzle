let isPuzzleActive = false;
let startTime;
let currentCanvas;

const borderColor = '#FFF';
const borderColorConnected = '#707070';

$("#puzzle-selector .puzzle-btn").on("click touch", onSelectPuzzle);

$("#change-puzzle").on("click touch", onClickChangePuzzle);

$("#go-to-quiz-btn").on("click touch", onClickGoToQuiz);

$('#dark-overlay').fadeOut(1000);

function onSelectPuzzle()
{
        let selectedBtn = $(this);
        let selectedPuzzleId = selectedBtn.data("puzzle-id");

        $("#puzzle-selector").addClass("hidden");

        $("#change-puzzle").removeClass("hidden");

        startPuzzle(selectedPuzzleId);
        startTime = new Date();
}

function startPuzzle(selectedPuzzleId)
{
        let puzzleContainer = $("#puzzle-container");
        puzzleContainer.removeClass("hidden");

        let img = new Image();
        img.src = '/src/img/puzzle/' + selectedPuzzleId + '.jpg';

        let audio = new Audio('/src/audio/connect.wav');

        img.onload = () => {

                //-- On détermine le nombre de colonnes et de lignes en fonction du ratio l'image
                // let ratio = img.width / img.height;
                // // const cols = img.width > img.height ? 4 : 3;
                // // const rows = img.width > img.height ? 3 : 4;
                // //-- Si l'image est presque carrée, on fait 4x4 sinon 3x4
                // const cols = ratio > 1.2 ? 4 : 3;
                // const rows = ratio > 1.2 ? 3 : 4;

                const cols = 4;
                const rows = 3;

                const pieceSize = {
                        x: Math.floor(img.width / cols),
                        y: Math.floor(img.height / rows)
                };

                /* ATTENTION TAILLE DES IMAGES */
                //-- Actuellement les images doivent faire la taille désirée du puzzle -300 en largeur et hauteur (pour laisser de la marge)

                const canvas = new headbreaker.Canvas('canvas', {
                        width: 1600 ,//img.width + 800,
                        height: 900 ,//img.height + 600,
                        proximity: 40,
                        pieceSize,
                        strokeWidth: 3,
                        strokeColor: borderColor,
                        outline: new headbreaker.outline.Rounded(),
                        image: img,
                        preventOffstageDrag: true,
                        fixed: true
                });

                canvas.puzzle.forceConnectionWhileDragging();

                canvas.adjustImagesToPuzzleHeight();

                canvas.autogenerate({
                        horizontalPiecesCount: cols,
                        verticalPiecesCount: rows,
                        insertsGenerator: headbreaker.generators.random
                });

                canvas.onConnect((_piece, figure, _target, targetFigure) => {
                        // play sound
                        audio.play();

                        //-- Colorise les bords des pièces connectées
                        figure.shape.stroke(borderColorConnected);
                        targetFigure.shape.stroke(borderColorConnected);
                        canvas.redraw();

                        setTimeout(() => {
                                // restore border colors
                                // later
                                figure.shape.stroke(borderColor);
                                targetFigure.shape.stroke(borderColor);
                                canvas.redraw();
                        }, 200);
                });

                canvas.onDisconnect((it) => {
                        audio.play();
                });

                //-- For testing
                canvas.puzzle.pieces[4].translate(63, -56);

                canvas.attachSolvedValidator();
                canvas.onValid(endPuzzle)

                canvas.shuffle(0.7);

                //-- For testing
                // canvas.solve();

                canvas.draw();

                currentCanvas = canvas;
        };

        isPuzzleActive = true;
}

function endPuzzle()
{
        console.log("Puzzle terminé !");
        isPuzzleActive = false;

        let canvas = currentCanvas;
        let img = canvas.imageMetadata.content

        let puzzleOverlay = $("#puzzle-overlay");

        let endTime = new Date();
        let timeDiff = endTime - startTime;

        let seconds = Math.round(timeDiff / 1000);

        //-- Transforme en minutes et secondes
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        let time = "";
        if (minutes > 0)
        {
                time +=  minutes + " minute" + (minutes > 1 ? "s" : "");

                if (seconds > 0)
                        time += " et ";
        }

        if (seconds > 0)
                time += seconds + " seconde" + (seconds > 1 ? "s" : "");

        setTimeout(() => {
                puzzleOverlay.find('img')
                        .attr('src', img.src)

                puzzleOverlay
                        .width(canvas.width)
                        .height(canvas.height);

                puzzleOverlay
                        .removeClass('hidden')
                puzzleOverlay.css('opacity', 1)

                puzzleOverlay.find('.time').text(time);

        }, 1000);

        setTimeout(() => location.href = "/index.html", 10000); //<- On quitte le puzzle après 10 secondes
}

function changePuzzle()
{
        //-- Reset le puzzle
        // if (currentCanvas)
        // {
        //         currentCanvas.clear();
        //         currentCanvas = null;
        // }

        $("#change-puzzle").addClass("hidden");
        $("#puzzle-overlay").addClass("hidden");
        $("#puzzle-container").addClass("hidden");
        $("#puzzle-selector").removeClass("hidden");
}

function onClickGoToQuiz()
{
        //-- Si on avait pas commencé le puzzle, on retourne direct au quiz
        if (!isPuzzleActive)
        {
                goToQuiz();
                return;
        }

        //-- Sinon on affiche une modale de confirmation

        console.log("Affichage de la modale de confirmation");
        let modal = $("#quit-modal");
        let overlay = $("#overlay");

        // modal.removeClass("hidden");
        // overlay.removeClass("hidden");
        modal.fadeIn(300);
        overlay.fadeIn(300);

        modal.find(".cancel-quit").on("click touch", function() {
                modal.fadeOut(300);
                overlay.fadeOut(300);
        });

        modal.find(".confirm-quit").on("click touch", function() {
                goToQuiz();
        });
}

function onClickChangePuzzle()
{
        //-- Si on avait pas commencé le puzzle, on va direct au menu des puzzles
        if (!isPuzzleActive)
        {
                changePuzzle();
                return;
        }

        //-- Sinon on affiche une modale de confirmation

        console.log("Affichage de la modale de confirmation");
        let modal = $("#quit-modal");
        let overlay = $("#overlay");

        modal.removeClass("hidden");
        overlay.removeClass("hidden");

        modal.find(".cancel-quit").on("click touch", function() {
                modal.addClass("hidden");
                overlay.addClass("hidden");
        });
        modal.find(".confirm-quit").on("click touch", () => {
                modal.addClass("hidden");
                overlay.addClass("hidden");
                changePuzzle()
        });

}

function goToQuiz()
{
        $('#dark-overlay').fadeIn(1000);
        setTimeout(() => {
            window.location.href = "/html/quiz.html";
        }, 1200)
}