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

        document.body.append(this.elDivMap);
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
    }

}

const app = new App();

export default app;