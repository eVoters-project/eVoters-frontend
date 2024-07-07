export class MapConfig implements google.maps.MapOptions {

  constructor(config?: Partial<google.maps.MapOptions>) {
    if (config) {
      Object.assign(this, config);
    }
  }

  /**
   *
   */
  mapId = "E_VOTER_MAP";

  /**
   *
   */
  center = { lat: 10.4026384, lng: 123.7151703 };

  /**
   *
   */
  zoom = 8;

  /**
   *
   */
  disableDefaultUI = true;

  /**
   *
   */
  styles = [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'on' }]
    }
  ]

}
