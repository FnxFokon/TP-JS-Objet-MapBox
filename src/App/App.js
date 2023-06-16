// Importation de la config mapbox
import config from "../../app.config.json";

// Importer la librairie mapbox
import mapboxgl from "mapbox-gl";

// Importer style de bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Importer les scripts de bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//Importer le style de mapbox
import "mapbox-gl/dist/mapbox-gl.css";

// On importe le fichier css
import "../assets/style.css";
import LocalEvent from "./LocalEvent";
import PopUpHover from "./PopUpHover.js";
import LocalStorage from "./LocalStorage";

class App {
  // Propriétés
  // Container de la map
  elDivMap;
  // Instance de la map
  map;

  // Infos du FORM
  elEvtTitle;
  elEvtDesc;
  elEvtDateB;
  elEvtDateE;
  elEvtLat;
  elEvtLon;

  // Propriétés de la POPUP
  hover = false;
  popUpHover;

  // LocalStorage
  arrLocalEvts = [];
  localStorage;

  start() {
    console.log("App démarrée...");

    // On créer notre localStorage avec la class LocalStorage
    this.localStorage = new LocalStorage();

    // On met notre localStorage dans un tableau evts
    let localEvtsLiterals = this.localStorage.loadStorage();

    // On vérifie si le tableau n'est pas vide
    if (localEvtsLiterals.length >= 1) {
      // On boucle sur notre tableau
      for (let localEvtLiteral of localEvtsLiterals) {
        // On ajoute a notre tableau d'evt chaque evt stocker dans notre localStorage
        this.arrLocalEvts.push(new LocalEvent(localEvtLiteral));
        console.log("On créer le marker");
      }
    }
    this.loadDom();
    this.initMap();
  }

  // Méthode pour initier la MAP sur la page Web
  initMap() {
    // Initialiser la map
    // On récupère la clé d'api dans le fichier de config
    mapboxgl.accessToken = config.apis.mapbox_gl.api_key;

    // On instancie la map
    this.map = new mapboxgl.Map({
      container: this.elDivMap, // container ID
      style: config.apis.mapbox_gl.map_styles.satellite_streets, // style URL
      center: [2.79, 42.68], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "top-left");

    // On écoute le click sur la map
    this.map.on("click", this.handleClickMap.bind(this));
  }

  // Méthode pour chargé le DOM (html)
  loadDom() {
    // ----------------- MAP -----------------
    this.elDivMap = document.createElement("div");
    this.elDivMap.id = "map";

    // On créer une div qui contient le Form et la Div Title
    const elDivCont = document.createElement("div");
    elDivCont.id = "container-form";

    // ------------------- Div Title -------------------
    const elDivTitle = document.createElement("div");
    elDivTitle.id = "div-Title";

    // --- Ballon ---
    const elBallon = document.createElement("i");
    elBallon.className = "bi bi-balloon-fill";
    elBallon.id = "baloon";

    //  --- H1 ---
    const elH1 = document.createElement("h1");
    elH1.className = " h3 mx-2 mt-4";
    elH1.textContent = "Ajouter un événement";

    elDivTitle.append(elBallon, elH1);

    //  ------------------- Form -------------------
    const elForm = document.createElement("form");
    elForm.className = "container";
    elForm.setAttribute = ("action", '""');
    elForm.setAttribute = ("method", "post");
    elForm.noValidate = true;
    elForm.id = "formEvt";

    //  --- Titre de l'événement ---
    const elDivEvtTitle = document.createElement("Div");
    elDivEvtTitle.className = "form-group mt-4";

    const elLabelEvtTitle = document.createElement("label");
    elLabelEvtTitle.setAttribute = ("for", "evtTitle");
    elLabelEvtTitle.textContent = "Titre de l'événement";

    this.elEvtTitle = document.createElement("input");
    this.elEvtTitle.type = "text";
    this.elEvtTitle.name = "titleEvent";
    this.elEvtTitle.id = "titleEvent";
    this.elEvtTitle.classList = "form-control mt-2";

    elDivEvtTitle.append(elLabelEvtTitle, this.elEvtTitle);

    //  --- Description de l'événement ---
    const elDivEvtDesc = document.createElement("Div");
    elDivEvtDesc.className = "form-group mt-4";

    const elLabelEvtDesc = document.createElement("label");
    elLabelEvtDesc.setAttribute = ("for", "evtDesc");
    elLabelEvtDesc.textContent = "Description de l'événement";

    this.elEvtDesc = document.createElement("textarea");
    this.elEvtDesc.name = "evtDesc";
    this.elEvtDesc.id = "evtDesc";
    this.elEvtDesc.classList = "form-control mt-2";

    elDivEvtDesc.append(elLabelEvtDesc, this.elEvtDesc);

    //  --- Dates de début et de fin de l'événement ---
    // - Début de l'évenement -
    // <input type=”datetime-local” name="" id="" value="">
    const elDivDateEvtB = document.createElement("div");
    elDivDateEvtB.className = "form-group mt-4";

    const elLabelEvtDateB = document.createElement("label");
    elLabelEvtDateB.setAttribute = ("for", "EvtDateB");
    elLabelEvtDateB.textContent = "Date de début de l'événement";

    this.elEvtDateB = document.createElement("input");
    this.elEvtDateB.type = "datetime-local";
    this.elEvtDateB.name = "EvtDateB";
    this.elEvtDateB.id = "EvtDateB";
    this.elEvtDateB.classList = "form-control mt-2";

    elDivDateEvtB.append(elLabelEvtDateB, this.elEvtDateB);

    // - Fin de l'évenement -
    //  <input type=”datetime-local” name="" id="" value="">
    const elDivDateEvtE = document.createElement("div");
    elDivDateEvtE.className = "form-group mt-4";

    const elLabelEvtDateE = document.createElement("label");
    elLabelEvtDateE.setAttribute = ("for", "EvtDateE");
    elLabelEvtDateE.textContent = "Date de fin de l'événement";

    this.elEvtDateE = document.createElement("input");
    this.elEvtDateE.type = "datetime-local";
    this.elEvtDateE.name = "EvtDateE";
    this.elEvtDateE.id = "EvtDateE";
    this.elEvtDateE.classList = "form-control mt-2";

    elDivDateEvtE.append(elLabelEvtDateE, this.elEvtDateE);

    // --- On créer la div du form Lat ---
    const elDivEvtLat = document.createElement("div");
    elDivEvtLat.classList = "form-group mt-4";

    // Label et input du form lat
    const elLabelEvtLat = document.createElement("label");
    elLabelEvtLat.setAttribute = ("for", "latitude");
    elLabelEvtLat.textContent = "Latitude:";

    this.elEvtLat = document.createElement("input");
    this.elEvtLat.type = "number";
    this.elEvtLat.id = "latitude";
    this.elEvtLat.classList = "form-control mt-2";

    elDivEvtLat.append(elLabelEvtLat, this.elEvtLat);

    // --- On créer la div du form Lon ---
    const elDivEvtLon = document.createElement("div");
    elDivEvtLon.className = "form-group mt-4";

    // Label et input du form lon
    const elLabelEvtLon = document.createElement("label");
    elLabelEvtLon.setAttribute = ("for", "longitude");
    elLabelEvtLon.textContent = "Longitude:";

    this.elEvtLon = document.createElement("input");
    this.elEvtLon.type = "number";
    this.elEvtLon.id = "longitude";
    this.elEvtLon.classList = "form-control mt-2";

    elDivEvtLon.append(elLabelEvtLon, this.elEvtLon);

    // --- On créer la div buttons ---
    const elDivButton = document.createElement("div");
    elDivButton.className = "form-group mt-4";
    elDivButton.id = "div-buttons";

    //  Button add
    const elBtnEvtAdd = document.createElement("button");
    elBtnEvtAdd.type = "button";
    elBtnEvtAdd.textContent = "Ajouter";
    elBtnEvtAdd.classList = "btn btn-success mt-4";
    // Ajouter un eventListener sur le bouton
    elBtnEvtAdd.addEventListener("click", this.newEvtAdd.bind(this));

    //  Button Clear all
    const elBtnEvtClear = document.createElement("button");
    elBtnEvtClear.type = "button";
    elBtnEvtClear.textContent = "Tout supprimer";
    elBtnEvtClear.classList = "btn btn-danger mt-4";

    // Ajouter un eventListener sur le bouton
    elBtnEvtClear.addEventListener("click", this.clearAll.bind(this));

    elDivButton.append(elBtnEvtAdd, elBtnEvtClear);
    // On append toute les div,boutons à la div form pui la divmap et form au body
    elForm.append(
      elDivEvtTitle,
      elDivEvtDesc,
      elDivDateEvtB,
      elDivDateEvtE,
      elDivEvtLat,
      elDivEvtLon,
      elDivButton
    );
    elDivCont.append(elDivTitle, elForm);
    document.body.append(this.elDivMap, elDivCont);
  }

  // Méthode pour ajouter un evt
  newEvtAdd() {
    const newTitle = this.elEvtTitle.value.trim();
    const newDesc = this.elEvtDesc.value.trim();

    const newDateB = new Date(this.elEvtDateB.value);
    const newDateE = new Date(this.elEvtDateE.value);

    const newLat = this.elEvtLat.value;
    const newLon = this.elEvtLon.value;

    // ----------------- Couleur des markers -----------------
    let color = "";
    // On récupère la date à l'instant T
    const dateATM = new Date();

    // On vérifier l'écart entre la date de fin (dateEnd) et la date à l'instant T (dateATM)
    const diffTime = newDateE.getTime() - dateATM.getTime();

    // On convertis 3 jours en MilliSeconde pour la couleur des markers
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

    // On modifie la couleur seulon le temps du marker
    if (diffTime > threeDaysMs) {
      color = "green";
    } else if (diffTime <= threeDaysMs && diffTime > 0) {
      color = "orange";
    } else {
      color = "red";
    }

    // ----------------- On créer un marker et on l'ajoute à la map -----------------
    const newMarker = new mapboxgl.Marker({ color: color })
      .setLngLat([newLon, newLat])
      .addTo(this.map);

    // Création d'un objet qui regroupe toutes les informations sur l'évènement,
    const newEvtLiteral = {
      title: newTitle, // Crée une propriété 'title' et lui assigne la valeur de la variable 'newTitle'
      desc: newDesc,
      dateB: newDateB,
      dateE: newDateE,
      lat: newLat,
      lon: newLon,
    };

    // On transforme notre newEvtLiteral en tableau avant de le stocker dans le localStorage
    const newLocalEvt = new LocalEvent(newEvtLiteral);
    this.arrLocalEvts.push(newLocalEvt);
    this.localStorage.saveStorage(this.arrLocalEvts);

    // On récupere le marker pour pouvoir créer une Pop-up avec toutes les infos dessus
    this.markerElement = newMarker.getElement();

    // On afficher le Pop-up quand la souris survole le marker
    this.markerElement.addEventListener("mouseenter", () => {
      this.hover = true;
      this.popUpHover = new PopUpHover(newEvtLiteral, this.map).AddPopUp();
    });

    // On enleve le Pop-up quand la souris ne survole plus le marker
    this.markerElement.addEventListener("mouseleave", () => {
      this.hover = false;
      new PopUpHover(newEvtLiteral, this.map).RemovePopUp(this.popUpHover);
    });

    // On enleve le Pop-up quand on click dessus pour afficher la gross popup
    this.markerElement.addEventListener("click", () => {
      this.hover = false;
      new PopUpHover(newEvtLiteral, this.map).RemovePopUp(this.popUpHover);
    });

    // On créer la Pop-up avec toutes les infos au click
    const bigPopup = new mapboxgl.Popup().setHTML(`
        <h3>${newTitle}</h3>
        <p>${newDesc}</p>
        <p>Date de début: ${newDateB}</p>
        <p>Date de fin: ${newDateE}</p>
    `);

    // On met en relation le pop-up et son marker
    newMarker.setPopup(bigPopup);
  }

  // Méthode pour supprimer tous les markers de la map et du localStorage
  clearAll() {
    const arrLocalEvts = [];
    this.localStorage.saveStorage(arrLocalEvts);
    this.reload();
  }

  // Méthode qui capte le clique sur la map
  handleClickMap(evt) {
    // On récupere la valeur de la latitude et longitude en fonction de l'endroit cliquer sur la map
    this.elEvtLat.value = evt.lngLat.lat;
    this.elEvtLon.value = evt.lngLat.lng;
  }

  // Méthode pour recharger la page
  reload() {
    console.log("on recharge la page");
    // TODO:
  }
}

const app = new App();

export default app;

// TODO: Probleme avec le storage: Ne met pas les markers quand il charge le local storage.

// TODO: Faire le boutou pour raffraichir la page

// TODO: Bonus
