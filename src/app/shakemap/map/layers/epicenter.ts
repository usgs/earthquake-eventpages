import * as L from 'leaflet';

var epiIcon = L.icon({
    iconUrl: 'assets/star.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

export var epicenterLayer = {
    name: 'Epicenter',
    id: 'epicenter',
    productId: 'download/grid.xml',
    productType: 'text',
    legendImages: ['assets/legend-epicenter.png'],
    generateLayer: function (xml) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xml,'text/xml');
        var lat,
                lon,
                popupHtml;
        
        // open up the xml
        let children = xmlDoc.getElementsByTagName('shakemap_grid')[0].childNodes;
        var nodes: any[] = Array.prototype.slice.call(children);

        for (let node of nodes) {
            if (node.nodeName === 'event') {
                lat = node.getAttribute('lat');
                lon = node.getAttribute('lon');

                popupHtml = 
                    '<table>' +
                    '<tr><th>' + node.getAttribute('event_id') + '</th></tr>' +
                    '<tr><table><th>Magnitude:</th><td>' + node.getAttribute('magnitude') + '</td></table></tr>' +
                    '<tr><table><th>Depth:</th><td>' + node.getAttribute('depth') + '</td></table></tr>' +
                    '<tr><table><th>Location:</th><td>' + node.getAttribute('lat') + ', ' + node.getAttribute('lon') + '</td></table></tr>' +
                    '</table>';
                break;
            }
        }

        return L.marker([lat, lon], {icon: epiIcon})
                            .bindPopup(popupHtml)
                            .openPopup();

    }
};
