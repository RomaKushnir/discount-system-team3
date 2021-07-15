import GoogleMapReact from 'google-map-react';

function GoogleMap({ onChildMouseEnter, onChildMouseLeave }) {
  const mapDefaultProps = {
    center: {
      lat: 49.23278,
      lng: 28.48097
    },
    zoom: 9

  };
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GEO_API_KEY,
          language: 'en'
        }}
        defaultCenter={mapDefaultProps.center}
        defaultZoom={mapDefaultProps.zoom}
        onChildMouseEnter={onChildMouseEnter}
        onChildMouseLeave={onChildMouseLeave}
      >
      </GoogleMapReact>
    </>
  );
}

export default GoogleMap;
