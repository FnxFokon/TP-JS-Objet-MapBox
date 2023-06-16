class LocalEvent {
  title;
  desc;
  dateB;
  dateE;
  lat;
  lon;

  // On hydrate nos valeurs de notre LocalEvent
  constructor(evtLiteral) {
    this.title = evtLiteral.title;
    this.desc = evtLiteral.desc;
    this.dateB = evtLiteral.dateB;
    this.dateE = evtLiteral.dateE;
    this.lat = evtLiteral.lat;
    this.lon = evtLiteral.lon;
  }
}

export default LocalEvent;
