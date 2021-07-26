import { useState, useMemo, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';
import GoogleMapMarker from '../GoogleMapMarker';

function GoogleMap({ locations, selectedLocation, zoom }) {
  const [hoveredKey, setHoveredKey] = useState(-1);

  const defaultProps = useMemo(() => ({
    center: selectedLocation || { lat: 51.53278, lng: 29.48097 },
    zoom: zoom || 4
  }), [selectedLocation, zoom]);

  const Markers = locations.map((el) => (
    <GoogleMapMarker
      key={el.id}
      lat={el.latitude}
      lng={el.longitude}
      text={el.addressLine}
      hovered={el.id === hoveredKey}
    />
  ));

  const onMarkerMouseEnter = useCallback((key) => {
    setHoveredKey(key);
  }, []);

  const onMarkerMouseLeave = useCallback((key) => {
    setHoveredKey(key);
  }, []);

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
