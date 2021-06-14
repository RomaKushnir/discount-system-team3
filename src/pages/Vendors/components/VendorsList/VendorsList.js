import VendorListItem from '../VendorListItem';

function VendorsList({ vendors }) {
  return (
    <div>
      {vendors.length
        ? vendors.map(
          (vendor, i) => <VendorListItem vendor={vendor} key={i} />
        )
        : <p style={ { textAlign: 'center', marginTop: '10vh' } }>There are no vendors yet!</p>
      }
    </div>
  );
}

export default VendorsList;
