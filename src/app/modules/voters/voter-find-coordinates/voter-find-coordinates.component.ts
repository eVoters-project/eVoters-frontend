import { Component, inject, signal, ViewChild } from '@angular/core';
import { MapConfig, MapMarkerConfig } from '../../../config';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { VoterFindCoordinateInfoWindowOption } from '../../../config/map-info-window';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { VoterService } from '../service/voter.service';
import { VoterInterface } from '../../../interface';
import { catchError, delay, EMPTY, throwError } from 'rxjs';



@Component({
  selector: 'app-voter-find-coordinates',
  templateUrl: './voter-find-coordinates.component.html',
  styleUrl: './voter-find-coordinates.component.scss'
})
export class VoterFindCoordinatesComponent {

  dialogData = inject(DynamicDialogConfig);
  protected voterService = inject(VoterService);

  protected mapConfig = signal<MapConfig>(new MapConfig({
    zoom: 12
  }));
  protected markerCoordinates = signal<google.maps.LatLngLiteral | undefined | null>(undefined);
  protected markerConfig = signal<MapMarkerConfig>(new MapMarkerConfig());
  protected mapInfoConfig = signal<VoterFindCoordinateInfoWindowOption>(new VoterFindCoordinateInfoWindowOption());

  protected marker: MapMarker | null | undefined;
  protected isLoading = false;

  // viewchilds
  @ViewChild(MapInfoWindow, { static: true }) mapMarkerInfo!: MapInfoWindow;

  constructor() { }

  onMapClick(event: google.maps.MapMouseEvent) {
    // reset the coordinates to enable the animation
    if (this.markerCoordinates()) {
      this.markerCoordinates.set(null);
    }

    // settimeout to allow a quick pause
    setTimeout(() => {
      this.markerCoordinates.set(event.latLng?.toJSON());
    }, 10);
  }

  onMapMarkerClick(marker: MapMarker) {
    this.marker = marker;
    this.mapMarkerInfo.open(marker);
  }

  setVoterCoordinates() {
    this.isLoading = true;

    const payload = <Partial<VoterInterface>>{
      id: this.dialogData.data.id,
      latitude: this.marker?.getPosition()?.lat().toString(),
      longitude: this.marker?.getPosition()?.lng().toString()
    }

    this.voterService.updateData(payload)
      .pipe(
        delay(1000),
        catchError(() => {
          this.isLoading = false;
          return throwError(EMPTY)
        })
      )
      .subscribe((res: any) => {
        this.isLoading = false;
        setTimeout(() => {
          this.markerCoordinates.set(null);
        }, 100);
      });

  }

}
