export class VoterFindCoordinateInfoWindowOption implements google.maps.InfoWindowOptions {

  constructor(options?: Partial<google.maps.InfoWindowOptions>) {
    if (options) {
      Object.assign(this, options);
    }
  }

  headerContent = this.createHeaderElement();

  private createHeaderElement(): Element {
    const div = document.createElement('div');
    const h3 = document.createElement('strong');
    h3.textContent = 'Map Coordinates';
    div.appendChild(h3);
    return div;
  }

}
