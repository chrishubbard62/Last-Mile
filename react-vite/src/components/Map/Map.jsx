import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import {getKeyThunk} from '../../redux/deliveries'

const MapComponent = () => {
const dispatch = useDispatch()
const key = useSelector(state => state.deliveries.apiKey)
const [map, setMap] = useState(null)
const [currentPosition, setCurrentPosition] = useState({lat:37.773972,lng:-122.431297})

useEffect(() => {
 dispatch(getKeyThunk())
}, [dispatch])

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })
  const containerStyle = {
    width: '700px',
    height: '700px'
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if(!key) return <h2>loading</h2>


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
