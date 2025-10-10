let Quiz = [
        {
                "level": "enfant",
                "questions": [
                        {
                                "title": "Qu'est-ce que la ligne de démarcation ?",
                                "answers": {
                                        "1": "Un péage",
                                        "2": "Une ligne qui séparait la France pendant la guerre",
                                        "3": "Une ligne de train"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "Quand la ligne de démarcation a-t-elle été créée ?",
                                "answers": {
                                        "1": "En 1940",
                                        "2": "En 1942",
                                        "3": "En 1944"
                                },
                                "correct": "1"
                        },
                        {
                                "title": "Comment la vie des gens a-t-elle changé à cause de cette ligne ?",
                                "answers": {
                                        "1": "Ils pouvaient voyager gratuitement",
                                        "2": "Ils ne pouvaient plus circuler librement",
                                        "3": "Ils avaient plus de temps pour jouer"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "Que veut dire « clandestin » ?",
                                "answers": {
                                        "1": "Un événement annoncé",
                                        "2": "Une activité secrète",
                                        "3": "Un objet en vitrine"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "Que fait un passeur ?",
                                "answers": {
                                        "1": "Il/Elle renseigne les gens sur les endroits à visiter",
                                        "2": "Il/Elle transporte des personnes d’un endroit à l’autre souvent de manière illégale",
                                        "3": "Il/Elle vend des produits sur un marché"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "Quand la ligne de démarcation a-t-elle été enlevée ?",
                                "answers": {
                                        "1": "le 6 juin 1944",
                                        "2": "le 11 novembre 1941",
                                        "3": "le 1er mars 1943"
                                },
                                "correct": "3"
                        }
                ]
        },
        {
                "level": "adulte",
                "questions": [
                        {
                                "title": "Quand la ligne de démarcation a-t-elle été mise en place en France?",
                                "answers": {
                                        "1": "En 1940",
                                        "2": "En 1941",
                                        "3": "En 1942"
                                },
                                "correct": "1"
                        },
                        {
                                "title": "Comment est matérialisée la ligne de démarcation ?",
                                "answers": {
                                        "1": "Par des murs en béton",
                                        "2": "Par des poteaux et des fils de fer barbelés",
                                        "3": "Par des panneaux lumineux"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "Qui surveille la ligne de démarcation du côté de Vichy ?",
                                "answers": {
                                        "1": "Des soldats de la Wehrmacht uniquement",
                                        "2": "Une combinaison de soldats, gendarmes, policiers et douaniers",
                                        "3": "Des civils"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "Pourquoi l’Allemagne envahit-elle la zone sud ?",
                                "answers": {
                                        "1": "Car les Alliés ont débarqué en Normandie",
                                        "2": "Car les Alliés ont débarqué en Afrique du Nord",
                                        "3": "Car les Alliés ont débarqué en Corse"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "Quel type d'engagement peut représenter le fait d'aider quelqu'un à passer la ligne ?",
                                "answers": {
                                        "1": "Un engagement militaire",
                                        "2": "Un acte de solidarité",
                                        "3": "Un acte criminel"
                                },
                                "correct": "2"
                        },
                        {
                                "title": "A quelle date la ligne de démarcation n’est plus en fonction ?",
                                "answers": {
                                        "1": "6 juin 1944",
                                        "2": "11 novembre 1941",
                                        "3": "1er mars 1943"
                                },
                                "correct": "3"
                        }
                ]
        }
];

let ResultsTexts = {
        "enfant": {
                0  : "Malheureusement, vous n’avez pas réussi à valider votre pass...",
                3  : "Félicitations, vous avez validé votre pass... <strong>Vous pouvez le tamponner !</strong>",
        },
        "adulte": {
                0  : "Malheureusement, vous n’avez pas réussi à valider votre pass...",
                3  : "Félicitations, vous avez validé votre pass... <strong>Vous pouvez le tamponner !</strong>",
        }
};
