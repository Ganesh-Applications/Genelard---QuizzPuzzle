$('#dark-overlay').fadeOut(1000);

$('.home-section').on('click touch', onClickHomeSection);

function onClickHomeSection()
{
        console.log("Clic");
        console.log($(this));
        //-- Au clic sur les sections de home, on change le style de la section et on redirige bers l'activité choisie
        let target = $(this).hasClass('quiz-section') ? 'quiz' : 'puzzle';

        $(this).addClass('clicked');
        $('#dark-overlay').fadeIn(1200);

        setTimeout(function() {
                window.location.href = `/html/${target}.html`;
        }, 1600);
}