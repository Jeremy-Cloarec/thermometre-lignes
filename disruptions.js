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
}

