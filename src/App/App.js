// Importation de la config mapbox
import config from '../../app.config.json';

// Importer la librairie mapbox
import mapboxgl from 'mapbox-gl';

// Importer style de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importer les scruot de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Importer le style de mapbox
import 'mapbox-gl/dist/mapbox-gl.css';

// On importe le fichier css
import '../assets/style.css';

class App {

    // Propriétés
    // Container de la map
    elDivMap;
    // Instance de la map
    map;

    start() {
        console.log('App démarrée...');
        this.loadDom();
        this.initMap();
    }

    loadDom() {
        // ----------------- MAP -----------------
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        //  ------------------- Form -------------------
        const elFormDiv = document.createElement('form');
        elFormDiv.className = "container";
        elFormDiv.setAttribute = ('action', '""');
        elFormDiv.setAttribute = ('method', 'post');
        elFormDiv.id = 'formEvt';

        //  --- H1 ---
        const elFormH1 = document.createElement('h1');
        elFormH1.className = ('h3 mx-3');
        elFormH1.textContent = 'Ajouter un événement';

        //  --- Titre de l'événement ---
        const elDivEvtTitle = document.createElement('Div');
        elDivEvtTitle.className = 'form-group mt-4';

        const elLabelEvtTitle = document.createElement('label');
        elLabelEvtTitle.setAttribute = ('for', 'evtTitle');
        elLabelEvtTitle.textContent = 'Titre de l\'événement';

        const elEvtTitle = document.createElement('input');
        elEvtTitle.type = 'text';
        elEvtTitle.name = 'titleEvent';
        elEvtTitle.id = 'titleEvent';
        elEvtTitle.classList = 'form-control mt-2';

        elDivEvtTitle.append(elLabelEvtTitle, elEvtTitle);

        //  --- Description de l'événement ---
        const elDivEvtDesc = document.createElement('Div');
        elDivEvtDesc.className = 'form-group mt-4';

        const elLabelEvtDesc = document.createElement('label');
        elLabelEvtDesc.setAttribute = ('for', 'evtDesc');
        elLabelEvtDesc.textContent = 'Description de l\'événement';

        const elEvtDesc = document.createElement('textarea');
        elEvtDesc.name = 'evtDesc';
        elEvtDesc.id = 'evtDesc';
        elEvtDesc.classList = 'form-control mt-2';

        elDivEvtDesc.append(elLabelEvtDesc, elEvtDesc);


        //  --- Dates de début et de fin de l'événement ---
        // - Début de l'évenement -
        // <input type=”datetime-local” name="" id="" value="">
        const elDivDateEvtB = document.createElement('div');
        elDivDateEvtB.className = 'form-group mt-4';

        const elLabelEvtDateB = document.createElement('label');
        elLabelEvtDateB.setAttribute = ('for', 'EvtDateB');
        elLabelEvtDateB.textContent = 'Date de début de l\'événement';

        const elEvtDateB = document.createElement('input');
        elEvtDateB.type = 'datetime-local';
        elEvtDateB.name = 'EvtDateB';
        elEvtDateB.id = 'EvtDateB';
        elEvtDateB.classList = 'form-control mt-2';

        elDivDateEvtB.append(elLabelEvtDateB, elEvtDateB);


        // - Fin de l'évenement -
        //  <input type=”datetime-local” name="" id="" value="">
        const elDivDateEvtE = document.createElement('div');
        elDivDateEvtE.className = 'form-group mt-4';

        const elLabelEvtDateE = document.createElement('label');
        elLabelEvtDateE.setAttribute = ('for', 'EvtDateE');
        elLabelEvtDateE.textContent = 'Date de fin de l\'événement';

        const elEvtDateE = document.createElement('input');
        elEvtDateE.type = 'datetime-local';
        elEvtDateE.name = 'EvtDateE';
        elEvtDateE.id = 'EvtDateE';
        elEvtDateE.classList = 'form-control mt-2';

        elDivDateEvtE.append(elLabelEvtDateE, elEvtDateE);

        // On créer la div du form Lat
        const elDivEvtLat = document.createElement('div');
        elDivEvtLat.classList = 'form-group mt-4';

        // Label et input du form lat
        const elLabelEvtLat = document.createElement('label');
        elLabelEvtLat.setAttribute = ('for', 'latitude');
        elLabelEvtLat.textContent = 'Latitude:';

        const elEvtLat = document.createElement('input');
        elEvtLat.type = 'text';
        elEvtLat.id = 'latitude';
        elEvtLat.classList = 'form-control mt-2';

        elDivEvtLat.append(elLabelEvtLat, elEvtLat);

        // On créer la div du form Lon
        const elDivEvtLon = document.createElement('div');
        elDivEvtLon.className = 'form-group mt-4';

        // Label et input du form lon
        const elLabelEvtLon = document.createElement('label');
        elLabelEvtLon.setAttribute = ('for', 'longitude');
        elLabelEvtLon.textContent = 'Longitude:';

        const elEvtLon = document.createElement('input');
        elEvtLon.type = 'text';
        elEvtLon.id = 'longitude';
        elEvtLon.classList = 'form-control mt-2';

        elDivEvtLon.append(elLabelEvtLon, elEvtLon);

        //  TODO: <button type="button" id="new-nota-add">➕</button>
        //  const elButtonNewNoteAdd = document.createElement('button');
        //  elButtonNewNoteAdd.type = 'button';
        //  elButtonNewNoteAdd.id = 'new-note-add';
        //  elButtonNewNoteAdd.textContent = '➕';
        //  // Ajouter un eventListener sur le bouton
        //  elButtonNewNoteAdd.addEventListener('click', this.handleNewNoteAdd.bind(this));
        // // </form>

        // // Div
        // const elDivClear = document.createElement('div');

        // // <button type="button" id="clear-all">🗑️</button>
        // const elButtonClearAll = document.createElement('button');
        // elButtonClearAll.type = 'button';
        // elButtonClearAll.id = 'clear-all';
        // elButtonClearAll.textContent = '🗑️';

        // // Ajouter un eventListener sur le bouton
        // elButtonClearAll.addEventListener('click', this.handlerClearAll.bind(this));

        // // button dans la div
        // elDivClear.append(elButtonClearAll);



        elFormDiv.append(elFormH1, elDivEvtTitle, elDivEvtDesc, elDivDateEvtB, elDivDateEvtE, elDivEvtLat, elDivEvtLon);
        document.body.append(this.elDivMap, elFormDiv);
    }


    initMap() {
        // Initialiser la map
        // On récupère la clé d'api dans le fichier de config
        mapboxgl.accessToken = config.apis.mapbox_gl.api_key;

        // On instancie la map
        this.map = new mapboxgl.Map({
            container: this.elDivMap, // container ID
            style: config.apis.mapbox_gl.map_styles.satellite_streets, // style URL
            center: [2.79, 42.68], // starting position [lng, lat]
            zoom: 12 // starting zoom
        });
        const nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'top-left');

        // On écoute le click sur la map
        this.map.on('click', this.handleClickMap.bind(this));
    }

    // Méthode qui capte le clique sur la map
    handleClickMap(evt) {
        console.log('evt', evt)
        console.log('lon', evt.lngLat.lng);
        console.log('lat', evt.lngLat.lat);
    }

}

const app = new App();

export default app;