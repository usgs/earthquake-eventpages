import * as L from 'leaflet';
import 'leaflet-svg-shape-markers';
import { getMmiRgba } from '../../util/mmi_colors';
import { getRomanFromMmi } from '../../util/mmi_roman';

var shapeMarkerOptions = {
    shape: 'circle',
    fillColor: '#ffffff',
    fillOpacity: 1,
    color: '#444444',
    radius: 6,
    weight: 1,
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(generatePopup(feature.properties));
    }
}

var generatePopup = function (props) {
    let mmi = getRomanFromMmi(props.intensity);
    let color = getMmiRgba(props.intensity);
    
    return `
    <div>
        <h3 style="border-bottom:2px solid black">` + 
            props.network + ': ' + props.name + 
        `</h3>
        <table style="width:100%;
                    text-align:center;">
            <tr>
                <td style="width:60px;
                        padding-right:10px;">
                    <table style="background-color:` + color + `;
                            border:2px solid black;
                            border-radius:3px;
                            width:100%">
                        <tr>
                            <th>
                                <h1 style="margin:0;">
                                    ` + mmi + `
                                </h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                mmi
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <th>
                                ` + makeNumber(props.pga) + ` %g
                            </th>
                        </tr>
                        <tr>
                            <td>
                                pga
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <th>
                                ` + makeNumber(props.pgv) + ` cm/s
                            </th>
                        </tr>
                        <tr>
                            <td>
                                pgv
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <th>
                                ` + makeNumber(props.distance) + ` km
                            </th>
                        </tr>
                        <tr>
                            <td>
                                distance
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    `
}

var makeNumber = function (num) {
    return Number(Number(num).toPrecision(3));
}

export var stationLayer = {
    name: 'Stations',
    id: 'stations',
    productId: 'download/stationlist.json',
    type: 'json',
    legendImages: ['assets/legend-shakemap-station.png',
                    'assets/legend-seismic-station.png',
                    'assets/legend-intensity-scale.png'],
    generateLayer: function (json) {
        return L.geoJson(json, {
            pointToLayer: function (feature, latlng) {
                if ((feature.properties['station_type']) && feature.properties['station_type'] === 'macroseismic') {
                    shapeMarkerOptions.shape = 'circle';
                } else {
                    shapeMarkerOptions.shape = 'triangle';
                }

                shapeMarkerOptions.fillColor = getMmiRgba(feature.properties.intensity)
                return L.shapeMarker(latlng, shapeMarkerOptions)
            },
            onEachFeature: onEachFeature
        });
    }
};

