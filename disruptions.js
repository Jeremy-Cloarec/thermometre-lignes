import { fetchin } from './script.js';

let globalContainerDisruption = document.querySelector('.global-container-disruption')
let open = false;

fetchin()
    .then((data) => {
        processDisruptionData(data)
    })
    .catch((error) => {
        console.error('Erreur lors de la récupération et du traitement des données:', error);
    });

function processDisruptionData(data) {
    console.log('Données dans myFunction:', data);

    let disruptions = data.disruptions;
    console.log(disruptions);

    //Boucle qui parcourt toutes les disruptions. 
    //Elle génère des dives et place les inf otrafics à l'intérieur
    for (const disruption of disruptions) {

        console.log(disruption.messages.text);
        console.log(disruption.messages.title);
        console.log(disruption.severity.priority);
        console.log(disruption.severity.name);
        console.log(disruption.application_periods[0].begin);
        console.log(disruption.application_periods[0].end);

        //Container de disruption
        const containerDisruption = document.createElement("div");
        containerDisruption.classList.add("container-disruption");

        //on crée un div où on mettre l'affichage de la parturbation (severity + titre) et la fleche pour dérouler le message
        const subContainerDisruption = document.createElement("div");
        subContainerDisruption.classList.add('sub-container-disruption');

        //On mettra ic la severity et le titre du message
        const disruptionHeader = document.createElement("div");
        disruptionHeader.classList.add('disruption-header');

        //La div qui contiendra la fleche
        const arrowOpenDisruption = document.createElement("div")
        arrowOpenDisruption.classList.add("arrow-open-disruption");

        //le span de la fleche
        const spanArrowOpenDisruption = document.createElement("span");
        spanArrowOpenDisruption.classList.add("tool-swap");
        spanArrowOpenDisruption.id = "open-disruption";
        spanArrowOpenDisruption.setAttribute("role", "button");
        spanArrowOpenDisruption.setAttribute("tabindex", "0");
        spanArrowOpenDisruption.setAttribute("title", "changer la direction de la ligne");

        //HEADER VISIBLE DE LA CARD

        //A l'intérieur de la div disruption-header on va créer deux paragraphes (type de perturbation + titre de la pertu)
        const disruptionHeaderChild1 = document.createElement("p");
        const disruptionHeaderChild2 = document.createElement("p");

        //On assigne les valeurs title et name à deux variables
        const disruptionMessageTitle = document.createTextNode(disruption.messages.title);
        const disruptionSeverityName = document.createTextNode(disruption.severity.name);

        //On assigne ces variables aux deux paragraphes
        disruptionHeaderChild1.appendChild(disruptionMessageTitle);
        disruptionHeaderChild2.appendChild(disruptionSeverityName);

        //On insère ces deux paragraphes dans la div disruption-header
        disruptionHeader.appendChild(disruptionHeaderChild2);
        disruptionHeader.appendChild(disruptionHeaderChild1);

        //On insère disruption-header dans le sub-container
        subContainerDisruption.appendChild(disruptionHeader);

        //On insère le span dans son container arrox-open-disruption
        arrowOpenDisruption.appendChild(spanArrowOpenDisruption)

        //on insere le conteneur de la fleche dans le sub-container
        subContainerDisruption.appendChild(arrowOpenDisruption)

        containerDisruption.appendChild(subContainerDisruption)
        globalContainerDisruption.appendChild(containerDisruption)



        open = true;
    }

    if (open) {
        const openDisruption = document.querySelector('#open-disruption')
        console.log(openDisruption);

        openDisruption.addEventListener("click", function (e) {
            open_disruption('number')
        })

        function open_disruption(el) {
            document.querySelector('[data-iv="' + el + '"]').classList.toggle('hidden');
        }
    }
}

