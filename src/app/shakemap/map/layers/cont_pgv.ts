import * as L from 'leaflet';
var lineStyle = {
    "color": "#ffffff",
    "weight": 4,
    "opacity": 1
};

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup('PGV: ' + feature.properties.value);
    }
}

export var pgvLayer = {
    name: 'PGV Contours',
    id: 'pgv_cont',
    productId: 'download/cont_pgv.json',
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
