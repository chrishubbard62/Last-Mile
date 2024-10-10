import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const MapComponent = ({ apiKey, pickup, drop }) => {
  const [map, setMap] = useState(null)
  const [currentPosition, setCurrentPosition] = useState({ lat: 37.773972, lng: -122.431297 })

  // TODO---------------------- apiKey set to null while developing to save api calls -----------------------------
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: null
  })
  // TODO---------------------- apiKey set to null while developing to save api calls -----------------------------
  const containerStyle = {
    width: '700px',
    height: '700px'
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <div className="map_page__container">
      <div style={{ height: '700px', width: '700px' }}>
        {isLoaded && <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={13}
          center={currentPosition}
          onUnmount={onUnmount}
        >
          <Marker
            position={pickup}
            title='Pickup'
          />
          <Marker
            position={drop}
            title='Drop Off'
          />
        </GoogleMap>}
      </div>

    </div>
  );

}

export default MapComponent;
