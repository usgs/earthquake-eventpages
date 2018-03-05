import * as L from 'leaflet';
var lineStyle = {
    "color": "#ffffff",
    "weight": 2,
    "opacity": 1
};

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup('PGA: ' + feature.properties.value);
    }
}

export var pgaLayer = {
    name: 'PGA Contours',
    id: 'pga_cont',
    productId: 'download/cont_pga.json',
    type: 'json',
    generateLayer: function (json) {
        return L.geoJson(json, {
            style: function (feature, latlng) {
                if (lineStyle.weight == 4) {
                    lineStyle.weight = 2
                } else {
                    lineStyle.weight = 4
                }

                return lineStyle;
            },
            onEachFeature: onEachFeature
        });
    }
};
