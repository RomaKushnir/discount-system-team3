import RoomIcon from '@material-ui/icons/Room';
import styles from './GoogleMapMarker.module.scss';

function GoogleMapMarker({ text, $hover }) {
  return (
    <div className={`${styles.markerWrapper} ${$hover ? styles.hovered : ''}`} >
      {$hover && <p className={styles.infoBox}>{text}</p>}
      <RoomIcon className={styles.marker}/>
    </div>
  );
}

export default GoogleMapMarker;
