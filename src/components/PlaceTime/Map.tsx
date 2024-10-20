import 'ol/ol.css';
import { useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Point } from 'ol/geom';

function MapComponent() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObj = new Map({
      view: new View({
        center: fromLonLat([16.5687, 49.1785]),
        zoom: 14,
      }),
      layers: [new Tile({ source: new OSM() })],
      interactions: [],
    });
    const vectorSource = new VectorSource();

    const muniMarker = new Feature({
      geometry: new Point(fromLonLat([16.5687, 49.1785])),
      name: 'MUNI'
    });

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        scale: .5,
        //src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        src: 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png',
      }),
    });

    muniMarker.setStyle(markerStyle)
    
    vectorSource.addFeature(muniMarker);

      
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    mapObj.addLayer(vectorLayer);


    mapObj.setTarget(mapRef.current);

    return () => mapObj.setTarget('');
  }, []);

  return <div className ="map" ref={mapRef} />;
}

export default MapComponent;