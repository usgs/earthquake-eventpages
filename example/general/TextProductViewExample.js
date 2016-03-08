'use strict';

var TextProductView = require('general/TextProductView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var product = Product({
  'indexid': "74238201",
  'indexTime': 1455230871573,
  'id': "urn:usgs-product:admin:scitech-text:usp000hvnu-1455229215593:1455230870084",
  'type': "scitech-text",
  'code': "usp000hvnu-1455229215593",
  'source': "admin",
  'updateTime': 1455230870084,
  'status': "UPDATE",
  'properties': {
    'eventsource': "us",
    'eventsourcecode': "p000hvnu",
    'review-status': "Reviewed"
  },
  'preferredWeight': 1,
  'contents': {
    '': {
      'contentType': "1",
      'lastModified': 1455230870000,
      'length': 3083,
      'bytes': "<h2>Subduction Zone Geometry Analysis</h2> <p><strong>Most Likely Geometry: Strike = 194.89, Dip = 14.94</strong></p> <figure class=\"left\"> <img src=\"kur999_base.png\" max-width=\"550\" alt=\"\"/> <figcaption> Basemap of subduction zone showing the area of the trench constrained in this example. Earthquake locations from the gCMT catalog and EHB catalog (gray circles, sized according to magnitude) are shown. Maroon rectangle indicates the area shown in cross section (c); all earthquakes within this area may be used to constrain trench geometry. </figcaption> </figure> <figure class=\"left\"> <img src=\"kur999_trench.png\" max-width=\"1048\" alt=\"\"/> <figcaption> Cross-section of subduction zone taken perpendicular to the average strike of gCMTs that match selection criteria and whose equivalent EHB or NEIC locations lie within the maroon box from Figure 1. Gold CMTs are mechanisms from the gCMT catalog plotted at their equivalent EHB catalog location, used to constrain trench strike and dip. Orange CMTs are mechanisms without EHB locations, placed instead at the equivalent event location in the NEIC catalog, and also used to constrain geometry. Light and dark gray circles are events from the EHB catalog in front and behind the plane of the cross-section, respectively, but not used to constrain geometry because either (i) they did not have a corresponding mechanism in the gCMT catalog, or (ii) their mechanism in the gCMT catalog did not match selection criteria. The trench location is marked with a red square. Probability density functions for EHB and NEIC locations are shown as green lines, scaled by a factor of x20 for display purposes. The black solid line describes the best fitting planar geometry; the red dashed line the best-fitting non-planar geometry. The initial locations of the 'new event' used to help constrain geometry are shown by black circles and marked with arrows corresponding to the gCMT epicentroid and NEIC epicenter. PDFs for these locations are shown in red. The best-fitting fault plane from the gCMT catalog for the new event (if available) is shown with a black dashed line. By clicking on this figure, an expanded cross-section will show the fit between the non-planar geometry and deeper earthquake data (maroon circles), also used to help constrain this geometry. On this section, gray lines represent 100 bootstrapped interfaces computed with a random selection of the input data. </figcaption> </figure> <figure class=\"left\"> <img src=\"kur999_trench2.gif\" max-width=\"1048\" alt=\"\"/> </figure> <figure class=\"left\"> <img src=\"kur999_dip.png\" max-width=\"1048\" alt=\"\"/> <figcaption> Variation in dip of best-fitting fault planes from the gCMT catalog for all events used to constrain trench geometry across the plane of the cross-section. Individual event dips are shown with small dark gray circles, sized with magnitude. Large mechanisms indicate the average dip in 20km bins across the plane of the cross-section. Light gray mechanisms represent a bulk average; dark gray represents a moment-weighted average. </figcaption> </figure>"
    },
    'kur999_base.png': {
      contentType: "image/png",
      lastModified: 1455229051000,
      length: 608735,
      url: "http://earthquake.usgs.gov/archive/product/scitech-text/usp000hvnu-1455229215593/admin/1455230870084/kur999_base.png"
    },
    'kur999_dip.png': {
      contentType: "image/png",
      lastModified: 1455229100000,
      length: 64213,
      url: "http://earthquake.usgs.gov/archive/product/scitech-text/usp000hvnu-1455229215593/admin/1455230870084/kur999_dip.png"
    },
    'kur999_trench.png': {
      contentType: "image/png",
      lastModified: 1455229068000,
      length: 196081,
      url: "http://earthquake.usgs.gov/archive/product/scitech-text/usp000hvnu-1455229215593/admin/1455230870084/kur999_trench.png"
    },
    'kur999_trench2.gif': {
      contentType: "image/gif",
      lastModified: 1455229779000,
      length: 61477,
      url: "http://earthquake.usgs.gov/archive/product/scitech-text/usp000hvnu-1455229215593/admin/1455230870084/kur999_trench2.gif"
    }
  }
});


Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    TextProductView({
      el: document.querySelector('#text-product-view'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('#text-product-view').innerHTML = [
      '<p class="alert error">',
        'Failed to load general-text product',
      '</p>'
    ].join('');
  }
});
