import mapboxgl from "mapbox-gl";

// https://docs.mapbox.com/mapbox-gl-js/example/popup/ // Créer mon Pop-Up
// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/ // Gérer le Hover sur mon Pop-up
// https://docs.mapbox.com/mapbox-gl-js/api/markers/ // Positionner mon popup

class PopUpHover {
  // Propriétés
  evtTitle;
  evtDateB;
  evtDateE;
  evtLat;
  evtLon;
  map;

  constructor(newEvtLiteral, map) {
    // On hydrate les valeur des propriété avec celle contenu dans newEvtLiteral
    this.evtTitle = newEvtLiteral.title;
    this.evtDateB = newEvtLiteral.dateB;
    this.evtDateE = newEvtLiteral.dateE;
    this.evtLat = newEvtLiteral.lat;
    this.evtLon = newEvtLiteral.lon;
    this.map = map;
  }

  // Méthode d'affichage de la pop-up
  AddPopUp() {
    // Code récupéré sur le doc pour placer corectement la pop-up au niveau du marker
    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
      top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      bottom: [0, -markerHeight],
      "bottom-left": [
        linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      "bottom-right": [
        -linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      left: [markerRadius, (markerHeight - markerRadius) * -1],
      right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };

    // On configure les options de notre popuphover
    const popupH = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: popupOffsets,
    });

    // On modifie le style du curseur au survole du marker
    this.map.getCanvas().style.cursor = "pointer";

    // Création de la pop-up
    popupH
      // On Positionne la Pop-up
      .setLngLat([this.evtLon, this.evtLat])

      // On setup les Info afficher par la popup
      .setHTML(
        `
            <h1>${this.evtTitle}</h1>
            <div>${this.evtDateB}</div>
            <div>${this.evtDateE}</div>
            `
      )

      // On ajoute les infos sur la carte
      .addTo(this.map);

    return popupH;
  }

  // Méthode désafficher la pop-up
  RemovePopUp(popupH) {
    // On reset le style du curseur
    this.map.getCanvas().style.cursor = "";

    // On enleve la pop-up quand on ne survole plus
    popupH.remove();
  }
}

export default PopUpHover;
