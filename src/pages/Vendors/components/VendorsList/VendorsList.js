import VendorListItem from '../VendorListItem';
import VendorsListPage from '../../../../mockData/VendorsListPage';

function VendorsList() {
  return (
    <div>
      {VendorsListPage.length
        ? VendorsListPage.map(
          (vendor, i) => <VendorListItem vendor={vendor} key={i} />
        )
        : <p style={ { textAlign: 'center', marginTop: '10vh' } }>There are no vendors yet!</p>
      }
    </div>
  );
}

export default VendorsList;
