import { VoterMapLocationInterface } from "../../interface/map";

export class GoogleMapHelpers {

  static setVoterLocationMapMarkers(voterLocations: VoterMapLocationInterface[]): google.maps.LatLngLiteral[] {
    var latlng: google.maps.LatLngLiteral[] = [];

    voterLocations.forEach(loc => {
      latlng.push({
        lat: Number(loc.latitude),
        lng: Number(loc.longitude)
      })
    });

    return latlng;
  }

}
