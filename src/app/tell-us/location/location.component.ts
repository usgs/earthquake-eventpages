import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { CoordinatesService, LocationDialogComponent } from 'hazdev-ng-location-view';
import * as L from 'leaflet';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface Coordinates {
  confidence: number;
  latitude: number;
  longitude: number;
  method: string; // geocode, geolocate, pin, lat/lng
  name: string; // geolocate
  zoom: number; // based on confidence
}

/**
 * Location component used to select the user's location on the form
 *
 * @param change
 *     Behaviorsubject emits when location has changes/been selected
 * @param enter
 *     Label for user to enter location
 * @param update
 *     Label for user to change location, if entered before
 * @param value
 *     Value of current location
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'tell-us-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnDestroy, AfterViewInit {
  baseLayers: L.LayerGroup;
  @Output()
  change = new BehaviorSubject<any>(null);
  coordinates: Coordinates;
  // label for user to enter location
  @Input()
  enter = 'Choose location';
  layerControl: L.Control.Layers;
  map: L.Map;
  @ViewChild('mapWrapper')
  mapWrapper: ElementRef;
  marker: L.Marker;
  subscription = new Subscription();
  // label for user to change previously entered location
  @Input()
  update = 'Change location';
  // current location value
  @Input()
  value: any = {
    ciim_mapLat: null,
    ciim_mapLon: null
  };

  constructor(
    public coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) {}

  /**
   * Adds the street, satellite, and terrain baselayers to the map
   *
   */
  addBaselayers(): void {
    let baseMaps, satellite, street, terrain;

    // Street Map
    street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
        'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
        'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the ' +
        'GIS User Community',
      maxZoom: 16
    });

    // Satellite Map
    satellite = L.tileLayer(
      'https://services.arcgisonline.com/ArcGIS/rest/services/' +
        'World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, ' +
          'USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and ' +
          'the GIS User Community',
        maxZoom: 16
      }
    );

    // Terrain Map
    terrain = L.tileLayer(
      'https://services.arcgisonline.com/arcgis/rest/services/' +
        'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
          'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
          'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and ' +
          'the GIS User Community',
        maxZoom: 16
      }
    ).addTo(this.map);

    // Group baselayers
    baseMaps = {
      Satellite: satellite,
      Street: street,
      Terrain: terrain
    };

    // Add layer control to map
    this.layerControl = L.control.layers(baseMaps).addTo(this.map);
  }

  /**
   * Creates a location control that opens a material dialog with
   * the LocationDialogComponent as its content.
   *
   */
  addLocationControl(): void {
    let control;

    control = L.DomUtil.create(
      'div',
      'leaflet-bar leaflet-control ' + 'leaflet-location-control'
    );
    control.innerHTML = '<a class="material-icons">location_searching' + '</a>';

    // open dialog when custom control is clicked
    control.onclick = () => {
      this.openDialog();
    };

    // Create location control to open dialog
    const locationControl = L.Control.extend({
      options: {
        position: 'topleft'
      },

      initialize: function(options) {
        this._control = options.control;
      },

      onAdd: function(map) {
        return this._control;
      },

      onRemove: function(map) {
        // Nothing to do here
      }
    });

    // Add Location Control to map
    this.map.addControl(
      new locationControl({
        control: control
      })
    );
  }

  /**
   * Creates a leaflet map
   *
   */
  createMap(): void {
    // Create map (center on US)
    this.map = L.map(this.mapWrapper.nativeElement, {
      center: [38, -95],
      zoom: 3
    });

    // disable scroll wheel zoom while map is in dialog
    if (this.map) {
      this.map.scrollWheelZoom.disable();
    }
  }

  /**
   * Creates a marker that will be used to mark the current location
   * on the map.
   *
   */
  createMarker(): void {
    // Create location marker
    this.marker = new L.Marker([0, 0], {
      draggable: true,
      icon: L.icon({
        iconAnchor: [13, 41],
        iconSize: [25, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });

    // bind to dragend on map marker
    this.marker.on('dragend', this.onDragEnd, this);
  }

  /**
   * Destroys the map
   *
   */
  destroyMap(): void {
    this.map.remove();
    this.map = null;
  }

  /**
   * Unbinds the "dragend" event from the marker on the map
   *
   */
  destroyMarker(): void {
    this.marker.off('dragend', this.onDragEnd, this);
  }

  /**
   * Zoom/centers the map on the provided location
   *
   * @param coordinates
   *        A coordinate object that contains a lat/lng & zoom level
   *
   */
  moveMap(coordinates: Coordinates): void {
    // pan/zoom the provided location
    this.map.setView(
      new L.LatLng(coordinates.latitude, coordinates.longitude),
      coordinates.zoom
    );
  }

  /**
   * Update the marker's location on the map. This method will also
   * add the marker to the map if it has not been added.
   *
   * @param coordinates
   *        A coordinate object that contains a lat/lng to plot
   *
   */
  moveMarker(coordinates: Coordinates): void {
    let latLng;

    // Update the position of the marker
    latLng = L.latLng(coordinates.latitude, coordinates.longitude);
    this.marker.setLatLng(latLng);

    // if there is no marker on the map, add marker
    if (!this.map.hasLayer(this.marker)) {
      this.map.addLayer(this.marker);
    }
  }

  ngAfterViewInit() {
    // create leaflet map
    this.createMap();

    // create leaflet marker, do not add to map
    this.createMarker();

    // Add baselayers to map
    this.addBaselayers();

    // Add location control to map
    this.addLocationControl();

    // subscribe to location changes and menu toggling
    this.subscribeToServices();
  }

  ngOnDestroy() {
    // unbind dragend event
    this.destroyMarker();

    // destroy map
    this.destroyMap();

    // unsubscribe to services
    this.unsubscribeFromServices();
  }

  /**
   * Triggered by the dragend event on the marker. This method updates
   * the coordinate service with the marker's new location.
   *
   */
  onDragEnd() {
    let confidence, coordinates, latitude, longitude, zoom;

    // get zoom level from map
    zoom = this.map.getZoom();

    // get confidence from zoom
    confidence = this.coordinatesService.computeFromPoint(zoom);

    // grab coordinates off map marker
    coordinates = this.marker.getLatLng();

    // round latitude and longitude values based on confidence
    latitude = this.coordinatesService.roundLocation(
      +coordinates.lat,
      confidence
    );
    longitude = this.coordinatesService.roundLocation(
      +coordinates.lng,
      confidence
    );

    this.coordinatesService.setCoordinates({
      confidence: confidence,
      latitude: latitude,
      longitude: longitude,
      method: 'point',
      zoom: zoom
    });
  }

  /**
   * Open the Location Input Dialog
   */
  openDialog() {
    if (this.dialog && LocationDialogComponent) {
      this.dialog.open(LocationDialogComponent);
    }
  }

  /**
   * Set the location
   *
   * @param coordinates
   *     The coordinates to set
   */
  setLocation(coordinates: Coordinates) {
    if (coordinates) {
      this.value = {};

      // Coordinate object will always have these attributes, check for null
      if (coordinates.name !== null) {
        this.value.ciim_mapAddress = coordinates.name;
      }
      if (coordinates.confidence !== null) {
        this.value.ciim_mapConfidence = coordinates.confidence;
      }
      if (coordinates.latitude !== null) {
        this.value.ciim_mapLat = coordinates.latitude;
      }
      if (coordinates.longitude !== null) {
        this.value.ciim_mapLon = coordinates.longitude;
      }

      this.change.next(this.value);
    }
  }

  subscribeToServices(): void {
    this.subscription.add(
      this.coordinatesService.coordinates$.subscribe(coordinates => {
        if (coordinates) {
          this.coordinates = coordinates;
          this.setLocation(coordinates);
          this.moveMarker(coordinates);
          this.moveMap(coordinates);
        }
      })
    );
  }

  unsubscribeFromServices(): void {
    this.subscription.unsubscribe();
  }
}
