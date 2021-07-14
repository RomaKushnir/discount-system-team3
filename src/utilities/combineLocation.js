const combineLocation = (location) => ({
  ...location,
  value: location.id,
  label: `${location.countryCode}, ${location.city}, ${location.addressLine}`
});

export default combineLocation;
