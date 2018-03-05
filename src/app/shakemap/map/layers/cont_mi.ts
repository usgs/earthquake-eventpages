import * as L from 'leaflet';
import { getRomanFromMmi } from '../../util/mmi_roman';

var lineStyle = {
    "color": "#EFEFF0",
    "weight": 2,
    "opacity": 1
};

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(generatePopup(feature.properties));
    }
}

function generatePopup(props) {
    let mmi = getRomanFromMmi(props.value);

    let popupContent = `
        <table style="background-color:` + props.color + `;
                        border:2px solid black;
                        border-radius:3px;
                        width:100%;
                        text-align:center">
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
    `

    return popupContent;
}

function getLineStyle(feature) {
    lineStyle.color = feature.properties.color;
    return lineStyle
}

export var miLayer = {
    name: 'MMI Contours',
    id: 'mmi_cont',
    productId: 'download/cont_mi.json',
    type: 'json',
    legendImages: ['assets/legend-intensity-scale.png'],
    generateLayer: function (json) {
        return L.geoJson(json, {
            style: function (feature, latlng) {
                if (lineStyle.weight == 4) {
                    lineStyle.weight = 2;
                } else {
                    lineStyle.weight = 4;
                }
                lineStyle.color = feature.properties.color;
                return lineStyle;
            },
            onEachFeature: onEachFeature
        });
    }
};
