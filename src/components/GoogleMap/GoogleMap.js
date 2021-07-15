import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import GoogleMapMarker from '../GoogleMapMarker';

function GoogleMap({ locations, selectedLocation }) {
  const [hoveredKey, setHoveredKey] = useState(-1);
  const defaultProps = {
    center: selectedLocation.lat && selectedLocation.lng ? selectedLocation : { lat: 49.23278, lng: 28.48097 },
    zoom: 10

  };
  const Markers = locations.map((el) => (
    <GoogleMapMarker
      key={el.id}
      lat={el.latitude}
      lng={el.longitude}
      text={el.addressLine}
      hovered={el.id === hoveredKey}
    />
  ));

  const onMarkerMouseEnter = (key) => {
    setHoveredKey(key);
  };

  const onMarkerMouseLeave = (key) => {
    setHoveredKey(key);
  };

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GEO_API_KEY,
          language: 'en'
        }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        onChildMouseEnter={onMarkerMouseEnter}
        onChildMouseLeave={onMarkerMouseLeave}
      >
        {Markers}
      </GoogleMapReact>
    </>
  );
}

export default GoogleMap;
