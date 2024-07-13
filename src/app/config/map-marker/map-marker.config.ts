export class MapMarkerConfig implements google.maps.MarkerOptions {

  constructor(config?: Partial<google.maps.MarkerOptions>) {
    if (config) {
      Object.assign(this, config);
    }
  }

  /**
   * @memberof MapMarkerConfig
   * @default false
   */
  draggable = true;

  /**
  * @memberof MapMarkerConfig
   * @default BOUNCE
   */
  animation = google.maps.Animation.DROP;

  /**
   * @memberof MapMarkerConfig
   *
   */
  icon = "";

}
