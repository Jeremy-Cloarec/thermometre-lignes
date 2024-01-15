var sens = 0
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ligne = urlParams.get('ligne')

fetchin();

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

function fetchin() {
    fetch('https://testazure2.tcl.fr/route/B')
        .then(response => response.json())
        .then(data => processRouteData(data))
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

function processRouteData(data) {
    const roadmap = document.querySelector('.roadmap');
    roadmap.innerHTML = '';

    data.route[sens].stop_point.forEach((stop, index) => {
        let section;

        if (index === 0) {
            section = document.createElement('div');
            section.className = 'section-part-top ' + stop.stop_area;

            const border = document.createElement('div');
            border.className = 'section-part-border';
            //border.style.backgroundColor = '#' + data.display_informations.color;
            section.appendChild(border);

            if (data.impacted_objects.includes(stop.stop_area)) {
                const icon = document.createElement('img');
                icon.src = 'https://carte.tcl.fr/assets/images/disruptions/blocking.svg';
                icon.style.width = '26px';
                icon.style.marginLeft = '17px';
                icon.style.marginTop = '-3px';
                icon.alt = 'Perturbation Majeure';
                icon.className = 'perturbation';
                border.appendChild(icon);
            } else {
                const bull = document.createElement('div');
                bull.className = 'section-part-bull';
                bull.style.borderColor = '#' + data.route[sens].color;
                border.style.backgroundImage = data.impacted_objects.includes(stop.stop_area) ?
                    'linear-gradient(rgb(51, 51, 51) 50%, rgba(255, 255, 255, 0) 0%)' : 'linear-gradient(' + '#' + data.route[sens].color + ' 100%, rgba(255, 255, 255, 0) 0%)';

                bull.style.height = '20px';
                bull.style.width = '20px';
                bull.style.top = '-6px';
                bull.style.left = '17px';
                border.appendChild(bull);
            }


            const label = document.createElement('span');
            label.innerHTML = `<strong>${stop.name}</strong>`;
            section.appendChild(label);

            roadmap.appendChild(section);

        } else if (index === data.route[sens].stop_point.length - 1) {
            const header = document.querySelector('#titre_line');
            header.innerHTML = stop.name

            section = document.createElement('div');
            section.className = 'section-part-bottom';

            const border = document.createElement('div');
            border.className = 'section-part-border';
            section.appendChild(border);



            if (data.impacted_objects.includes(stop.stop_area)) {
                const icon = document.createElement('img');
                icon.src = 'https://carte.tcl.fr/assets/images/disruptions/blocking.svg';
                icon.style.width = '26px';
                icon.style.marginLeft = '17px';
                icon.style.marginTop = '-3px';
                icon.alt = 'Perturbation Majeure';
                icon.className = 'perturbation';
                border.appendChild(icon);
            } else {
                const bull = document.createElement('div');
                bull.className = 'section-part-bull';
                bull.style.borderColor = '#' + data.route[sens].color;
                bull.style.height = '20px';
                bull.style.width = '20px';
                bull.style.top = '-6px';
                bull.style.left = '17px';
                border.appendChild(bull);
            }

            const label = document.createElement('div');
            label.className = 'segmentTo';
            label.innerHTML = `<strong>${stop.name}</strong>`;
            section.appendChild(label);

            roadmap.appendChild(section);
        } else {

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

            if (data.impacted_objects.includes(stop.stop_area)) {
                const icon = document.createElement('img');
                icon.src = 'https://carte.tcl.fr/assets/images/disruptions/blocking.svg';
                icon.style.width = '20px';
                icon.style.marginLeft = '20px';
                icon.alt = 'Perturbation Majeure';
                icon.className = 'perturbation';
                border.appendChild(icon);
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
