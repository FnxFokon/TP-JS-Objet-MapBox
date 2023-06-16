class LocalEvent {
  title;
  desc;
  eventB;
  eventE;
  lat;
  lon;

  // On hydrate nos valeurs de notre LocalEvent
  constructor(evtLiteral) {
    this.title = evtLiteral.title;
    this.desc = evtLiteral.desc;
    this.eventB = evtLiteral.dateB;
    this.eventE = evtLiteral.dateE;
    this.lat = evtLiteral.lat;
    this.lon = evtLiteral.lon;
  }
}

export default LocalEvent;
