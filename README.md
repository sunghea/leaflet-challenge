# leaflet-challenge

# Earthquake Mapper

Earthquake Mapper is an interactive application that visualizes earthquake data on an interactive map, providing insights into recent earthquake activities alongside tectonic plate boundaries.

## Features

- **Earthquake Locations:** Displays earthquake locations with markers. The size and color of the markers indicate the magnitude and depth of each earthquake, respectively.
- **Tectonic Plate Boundaries:** Shows tectonic plate boundaries as orange lines. These boundaries help understand the geological context of earthquake occurrences.
- **Map Styles:** Offers multiple map styles to choose from, including Street Map, Satellite, Grayscale, and Outdoors.

## Usage

- **Map Navigation:** You can navigate the map by zooming in/out and dragging to explore different regions.
- **Map Layers:** Toggle earthquake locations and tectonic plate boundaries on/off using the layer control panel on the top right corner of the map.
- **Map Styles:** Change the base map style by selecting from the available options in the layer control panel.

- ## Data Source
The earthquake data used in this project was obtained from the United States Geological Survey (USGS) earthquake data feed. The data provides information about earthquakes worldwide and is updated regularly.

The tectonic plates data, known as PB2002 dataset, was sourced from [Peter Bird's website](http://peterbird.name/oldFTP/PB2002/) in June 2014. The original data is included in the "static/data" folder of this repository, with minor updates applied as needed.

### References
- [USGS Earthquake Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
- [PB2002 Tectonic Plates Dataset](http://peterbird.name/oldFTP/PB2002/)(https://github.com/fraxen/tectonicplates).


## Technologies Used

- JavaScript
- Leaflet.js
- D3.js

