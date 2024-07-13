import { Component, Input, OnInit, signal, Signal, ViewChild } from '@angular/core';
import { MapService } from '../../service/map/map.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { VoterMapLocationService } from '../../service/map';
import { GoogleMapHelpers } from '../../helpers/map/google-map.helpers';
import { MapMarkerConfig, VoterLocationMapMarkerConfig } from '../../config';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, MapInfoWindow],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
export class GoogleMapComponent implements OnInit {
  isLoading = false;

  // private
  private a_subs = new Array<Subscription>();

  // protected
  protected voterCoordinates: google.maps.LatLngLiteral[] = [];
  protected voterLocationMarkerConfig = new VoterLocationMapMarkerConfig();

  protected markerCoordinates = signal<google.maps.LatLngLiteral | undefined>(undefined);
  protected markerConfig = signal<MapMarkerConfig>(new MapMarkerConfig());

  @Input('options') mapOptions!: google.maps.MapOptions;

  // viewchilds
  @ViewChild(MapInfoWindow, { static: true }) mapMarkerInfo!: MapInfoWindow;

  constructor(
    private mapService: MapService,
    private voterMapLocation: VoterMapLocationService
  ) { }

  ngOnInit(): void {
    this.a_subs.push(
      this.getVoterLocationMarkers(),
    );

    this.mapService.getVoterLocations();
  }

  private getVoterLocationMarkers(): Subscription {
    return this.voterMapLocation.voterLocationMarkers$
      .subscribe((data) => {
        this.isLoading = true;

        this.voterCoordinates = GoogleMapHelpers.setVoterLocationMapMarkers(data);

        this.isLoading = false;
      });
  }

  protected addMarker(event: google.maps.MapMouseEvent) {
    // reset the coordinates to enable the animation
    this.markerCoordinates.set(undefined);

    // settimeout to allow a quick pause
    setTimeout(() => {
      this.markerCoordinates.set(event.latLng?.toJSON());
    });
  }

  protected onMapMarkerInfo(marker: MapMarker) {
    this.mapMarkerInfo.open(marker);
  }

}
