import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';



const MapComponent = ({apiKey}) => {
  const [map, setMap] = useState(null)
  const [currentPosition, setCurrentPosition] = useState({ lat: 37.773972, lng: -122.431297 })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  })

  const containerStyle = {
    width: '700px',
    height: '700px'
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    // Important! Always set the container height explicitly

    <div className="map_page__container">

      <div style={{ height: '900px', width: '900px' }}>
        {isLoaded && <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          center={currentPosition}
          onUnmount={onUnmount}
        >
        </GoogleMap>}
      </div>

    </div>
  );

}


export default MapComponent;
