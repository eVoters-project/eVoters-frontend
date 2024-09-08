import { Component, Input, OnInit, signal, Signal, ViewChild } from '@angular/core';
import { MapService } from '../../service/map/map.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { VoterMapLocationService } from '../../service/map';
import { MapMarkerConfig, VoterLocationMapMarkerConfig } from '../../config';
import { setVoterLocationMapMarkers } from '../../helpers';
import { VoterLocationCoordinateInfoWindowOption } from '../../config/map-info-window';
import { CommonModule } from '@angular/common';
import { VoterMapLocationInterface } from '../../interface/map';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMap,
    MapMarker,
    MapInfoWindow],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
export class GoogleMapComponent implements OnInit {
  isLoading = false;

  // private
  private a_subs = new Array<Subscription>();
  private voters!: VoterMapLocationInterface[];

  // protected
  protected voterCoordinates: google.maps.LatLngLiteral[] = [];
  protected voterLocationMarkerConfig = new VoterLocationMapMarkerConfig();
  protected voter!: VoterMapLocationInterface | null | undefined;

  protected markerCoordinates = signal<google.maps.LatLngLiteral | undefined>(undefined);
  protected markerConfig = signal<MapMarkerConfig>(new MapMarkerConfig());
  protected markerInfoVoterLocation = signal<VoterLocationCoordinateInfoWindowOption>(new VoterLocationCoordinateInfoWindowOption());

  @Input('options') mapOptions!: google.maps.MapOptions;

  // viewchilds
  @ViewChild('gmap', { static: true }) gMap!: google.maps.Map;
  @ViewChild('mapInfoMouseClickCoordinate', { static: true }) mapMarkerInfo!: MapInfoWindow;
  @ViewChild('mapInfoVoterLocationCoordinate', { static: true }) mapMarkerInfoVoterLocation!: MapInfoWindow;

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
        this.voters = data as VoterMapLocationInterface[];
        this.voterCoordinates = setVoterLocationMapMarkers(data);
        this.isLoading = false;
      });
  }

  private onCenterMap(position: google.maps.LatLng | null) {
    if (position) {
      this.gMap.panTo(position);
    }
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
    this.onCenterMap(marker.getPosition());
  }

  protected onMapMarkerInfoVoterLocation(marker: MapMarker) {
    this.voter = this.voters.find(p =>
      p.latitude == marker.getPosition()?.lat().toString()
      && p.longitude == marker.getPosition()?.lng().toString()
    );

    this.mapMarkerInfoVoterLocation.open(marker);
    this.onCenterMap(marker.getPosition());
  }

}
