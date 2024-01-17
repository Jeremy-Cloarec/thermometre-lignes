import { fetchin } from './script.js';

fetchin()
    .then((data) => {
        processDisruptionData(data)
    })
    .catch((error) => {
        console.error('Erreur lors de la récupération et du traitement des données:', error);
    });

function  processDisruptionData(data) {
    console.log('Données dans myFunction:', data);
    let disruptions = data.disruptions;
    console.log(disruptions);

    for (const disruption of disruptions) {
        console.log(disruption.messages.text);
        console.log(disruption.messages.title);
        console.log(disruption.severity.priority);
        console.log(disruption.severity.name);
        console.log(disruption.application_periods[0].begin);
        console.log(disruption.application_periods[0].end);
    }
}

