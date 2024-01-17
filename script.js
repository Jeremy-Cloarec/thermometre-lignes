var sens = 0
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ligne = urlParams.get('ligne')

let swapButton = document.querySelector('#swapDirection')
let openDisruption = document.querySelector('#open-disruption')

fetchin();

swapButton.addEventListener("click", function(){
    swap();
})
openDisruption.addEventListener("click", function(e){
    open_disruption('number')
})



function open_disruption(el) {
    document.querySelector('[data-iv="' + el + '"]').classList.toggle('hidden');
}

function swap() {
    if (sens == 0) {
        sens = 1
    } else if (sens == 1) {
        sens = 0
    }
    fetchin()
}

export async function fetchin() {
    try {
        const response = await fetch('https://testazure2.tcl.fr/route/B');
        if (!response.ok) {
            throw new Error('Réponse réseau non OK');
        }
        const data = await response.json()
        processRouteData(data)
        return data
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

function processRouteData(data) {
    const roadmap = document.querySelector('.roadmap');
    roadmap.innerHTML = '';

    data.route[sens].stop_point.forEach((stop, index) => {
        let section;

        //A l'intérieur de la boucle sur tout les point d'arrêt, on prend d'abrd le premier
        if (index === 0) {
            //On insère l'arrêt de départ dans direction-top
            const header1 = document.querySelector('#titre_line_1');
            header1.innerHTML = stop.name;
            header1.style.color = "white"

            const triangle = document.querySelector('.triangle');
            triangle.style.borderTop = `#${data.route[sens].color} solid 14px`;

            const directionTop = document.querySelector('.direction-top')
            directionTop.style.backgroundColor = '#' + data.route[sens].color;

            const swapDirection = document.querySelector('#swapDirection');
            swapDirection.style.color = '#' + data.route[sens].color;

            const toolsChange = document.querySelector('.tools-change');
            toolsChange.style.border = `#${data.route[sens].color} solid 2px`;

            section = document.createElement('div');
            section.className = 'section-part-top ' + stop.stop_area;

            const border = document.createElement('div');
            border.className = 'section-part-border';
            //border.style.backgroundColor = '#' + data.display_informations.color;
            section.appendChild(border);

            //Si perturbation de la ligne, mettre icone sens interdit
            if (data.impacted_objects.includes(stop.stop_area)) {
                const icon = document.createElement('img');
                icon.src = 'https://carte.tcl.fr/assets/images/disruptions/blocking.svg';
                icon.style.width = '26px';
                icon.style.marginLeft = '17px';
                icon.style.marginTop = '-3px';
                icon.alt = 'Perturbation Majeure';
                icon.className = 'perturbation';
                border.appendChild(icon);

                //Sinon on crée la bulle du point de départ
            } else {
                const bull = document.createElement('div');
                bull.className = 'section-part-bull';
                bull.style.borderColor = '#' + data.route[sens].color;
                border.style.backgroundImage = data.impacted_objects.includes(stop.stop_area) ?
                    'linear-gradient(rgb(51, 51, 51) 50%, rgba(255, 255, 255, 0) 0%)' : 'linear-gradient(' + '#' + data.route[sens].color + ' 100%, rgba(255, 255, 255, 0) 0%)';

                bull.style.height = '26px';
                bull.style.width = '26px';
                bull.style.top = '-6px';
                bull.style.left = '17px';
                border.appendChild(bull);
            }


            const label = document.createElement('span');
            label.innerHTML = `<strong>${stop.name}</strong>`;
            section.appendChild(label);
            roadmap.appendChild(section);

            //Puis le dernier
            //On insère le dernier arrête de la ligne dans directionBottom (destination)
        } else if (index === data.route[sens].stop_point.length - 1) {

            const header2 = document.querySelector('#titre_line_2');
            header2.innerHTML = stop.name;

            section = document.createElement('div');
            section.className = 'section-part-bottom';

            const border = document.createElement('div');
            border.className = 'section-part-border';
            section.appendChild(border);

            //On insère ici la bulle du point de destination
            //Si perturbaton, on insère un sens interdit
            if (data.impacted_objects.includes(stop.stop_area)) {
                const icon = document.createElement('img');
                icon.src = 'https://carte.tcl.fr/assets/images/disruptions/blocking.svg';
                icon.style.width = '26px';
                icon.style.marginLeft = '17px';
                icon.style.marginTop = '-3px';
                icon.alt = 'Perturbation Majeure';
                icon.className = 'perturbation';
                border.appendChild(icon);
                //Sinon on met le rond de départ
            } else {
                const bull = document.createElement('div');
                bull.className = 'section-part-bull';
                bull.style.borderColor = '#' + data.route[sens].color;
                bull.style.height = '26px';
                bull.style.width = '26px';
                bull.style.top = '-6px';
                bull.style.left = '17px';
                border.appendChild(bull);
            }

            const label = document.createElement('div');
            label.className = 'segmentTo';
            label.innerHTML = `<strong>${stop.name}</strong>`;
            section.appendChild(label);

            roadmap.appendChild(section);
            //Tous les autres points d'arrêtc
        } else {

            //Création de la ligne verticale qui sépare chaque arrêt
            if (data.impacted_objects.includes(stop.stop_area)) {
                el = document.getElementsByClassName('section-part-border');
                console.log(el[el.length - 1])
                el[el.length - 1].style.backgroundImage = 'linear-gradient(rgb(51, 51, 51) 50%, rgba(255, 255, 255, 0) 0%)';
            }
            section = document.createElement('div');
            section.className = 'section-part-content';

            const border = document.createElement('div');
            border.className = 'section-part-border';
            border.style.backgroundImage = data.impacted_objects.includes(stop.stop_area) ?
                'linear-gradient(rgb(51, 51, 51) 50%, rgba(255, 255, 255, 0) 0%)' : 'linear-gradient(' + '#' + data.route[sens].color + ' 100%, rgba(255, 255, 255, 0) 0%)';
            section.appendChild(border);

            //Si perturbation, on affiche le sens interdit
            if (data.impacted_objects.includes(stop.stop_area)) {
                const icon = document.createElement('img');
                icon.src = 'https://carte.tcl.fr/assets/images/disruptions/blocking.svg';
                icon.style.width = '20px';
                icon.style.marginLeft = '20px';
                icon.alt = 'Perturbation Majeure';
                icon.className = 'perturbation';
                border.appendChild(icon);
                //Sinon les bulles
            } else {
                const bull = document.createElement('div');
                bull.className = 'section-part-bull';
                bull.style.borderColor = '#' + data.route[sens].color;
                border.appendChild(bull);
            }

            const label = document.createElement('div');
            label.className = 'segmentFrom';
            label.innerHTML = `<strong>${stop.name}</strong>`;
            section.appendChild(label);
            roadmap.appendChild(section);
        }
    });
}

