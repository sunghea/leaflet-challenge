let queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
let tectonicPlatesUrl = 'static/data/PB2002_plates.json'; // URL for tectonic plates data

// Load earthquake data
d3.json(queryUrl).then(function(response) {
    // Retrieve properties
    let properties = response.features.map(feature => feature.properties);

    // Retrieve geometries
    let geometries = response.features.map(feature => feature.geometry);

    let earthquakeMarkers = [];

    // Create markers for each earthquake
    response.features.forEach(function(feature) {
        let coordinates = feature.geometry.coordinates;
        let latitude = coordinates[1];
        let longitude = coordinates[0];
        let place = feature.properties.place;
        let magnitude = feature.properties.mag;
        let depth = coordinates[2]; // Depth of the earthquake

        // Adjust marker size based on magnitude
        let markerSize = magnitude * 3;

        // Determine marker color based on depth
        let markerColor = getColorByDepth(depth);

        // Create marker and set popup
        let marker = L.circleMarker([latitude, longitude], {
            radius: markerSize,
            fillColor: markerColor,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(`<h3>${place}</h3><hr><p><b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth}</p>`);

        // Add marker to marker array
        earthquakeMarkers.push(marker);
    });

    // Function to determine color based on depth
    function getColorByDepth(depth) {
        if (depth > -10 && depth < 10) return "green";
        else if (depth >= 10 && depth < 30) return "lightgreen";
        else if (depth >= 30 && depth < 50) return "yellow";
        else if (depth >= 50 && depth < 70) return "goldenrod";
        else if (depth >= 70 && depth < 90) return "orange";
        else return "red";
    }

    // Create layer group for earthquake markers
    let earthquakesLocation = L.layerGroup(earthquakeMarkers);

    // Set up base map tile layers
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let satellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    let grayscale = L.tileLayer('https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://maps.stamen.com/toner-hybrid">Stamen</a> contributors'
    });

    let outdoors = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="https://opentopomap.org/about">OpenTopoMap</a> contributors'
    });

    // Define base maps
    let baseMaps = {
        "Street Map": streetmap,
        "Satellite": satellite,
        "Grayscale": grayscale,
        "Outdoors": outdoors
    };

    // Load tectonic plates data
    d3.json(tectonicPlatesUrl).then(function(platesData) {
        // Create layer for tectonic plates
        let tectonicPlatesLayer = L.geoJson(platesData, {
            style: function(feature) {
                return {
                    color: "orange",
                    weight: 2,
                    fillOpacity: 0
                };
            }
        });

        // Define overlay maps
        let overlayMaps = {
            "Earthquakes Location": earthquakesLocation,
            "Tectonic Plates": tectonicPlatesLayer
        };

        // Create map
        let map = L.map("map", {
            center: [39, -98],
            zoom: 4,
            layers: [streetmap, earthquakesLocation]
        });

        // Add layer control
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);

        // Create a legend to display depth and corresponding color
        let info = L.control({
            position: "bottomright"
        });

        info.onAdd = function(map) {
            let div = L.DomUtil.create("div", "info legend");
            div.innerHTML += "<h4>Depth</h4>";
            div.innerHTML += '<i style="background: green"></i><span>-10 to 10</span><br>';
            div.innerHTML += '<i style="background: lightgreen"></i><span>10 to 30</span><br>';
            div.innerHTML += '<i style="background: yellow"></i><span>30 to 50</span><br>';
            div.innerHTML += '<i style="background: goldenrod"></i><span>50 to 70</span><br>';
            div.innerHTML += '<i style="background: orange"></i><span>70 to 90</span><br>';
            div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';
            return div;
        };

        info.addTo(map);
    });

});
