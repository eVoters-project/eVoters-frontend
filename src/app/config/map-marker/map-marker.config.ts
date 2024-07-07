export class VoterLocationMapMarkerConfig implements google.maps.MarkerOptions {

  constructor(config?: Partial<google.maps.MarkerOptions>) {
    if (config) {
      Object.assign(this, config);
    }
  }

  /**
   * @memberof VoterLocationMapMarkerConfig
   * @default false
   */
  draggable = false;

}
