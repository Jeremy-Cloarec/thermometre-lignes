import { fetchin } from './script.js';

const containerDisruption = document.querySelector('#container-disruption');
const subContainerDisruption = document.querySelector('#sub-container-disruption')

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

        const disruptionHeader = document.createElement("div");
        disruptionHeader.classList.add('disruption-header')

        const disruptionHeaderChild1 = document.createElement("p");
        const disruptionHeaderChild2 = document.createElement("p");

        const disruptionMessageTitle = document.createTextNode(disruption.messages.title);
        const disruptionSeverityName = document.createTextNode(disruption.severity.name);

        disruptionHeaderChild1.appendChild(disruptionMessageTitle);
        disruptionHeaderChild2.appendChild(disruptionSeverityName);

        disruptionHeader.appendChild(disruptionHeaderChild2);
        disruptionHeader.appendChild(disruptionHeaderChild1);

        subContainerDisruption.appendChild(disruptionHeader);




    }




}

