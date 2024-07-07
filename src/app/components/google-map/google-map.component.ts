import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../../service/map/map.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { VoterMapLocationService } from '../../service/map';
import { GoogleMapHelpers } from '../../helpers/map/google-map.helpers';
import { VoterLocationMapMarkerConfig } from '../../config';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMap, MapMarker],
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

  @Input('options') mapOptions!: google.maps.MapOptions;

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

}
