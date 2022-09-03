import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Icon, Map, Marker, TileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage implements OnInit {
  private map: Map | undefined;
  private readonly mapCenterCoords: [number, number] = [48.060_598, 8.534_339];
  private readonly markerCoords: [number, number] = [48.0607, 8.534_339];

  constructor() {}

  public ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new Map('map', {
      center: this.mapCenterCoords,
      zoom: 18,
    });
    const tiles = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.addTo(this.map);
    const markerIcon = new Icon({
      iconUrl: 'assets/images/dhbw-vs-map-marker.png',
      iconSize: [40, 65],
    });
    const marker = new Marker(this.markerCoords, { icon: markerIcon });
    marker.addTo(this.map);
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }
}
