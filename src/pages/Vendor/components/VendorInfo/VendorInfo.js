import React from 'react';
import style from './VendorInfo.module.scss';

function VendorInfo({
  // title,
  // img = 'https://picsum.photos/200/300',
  // location,
  // address1,
  // address2,
  // category1,
  // category2,
  // category3
  vendor
}) {
  console.log(vendor);
  const { title, location, imageUrl } = vendor;
  return (
        <div>
        { <div className={style.borderCard}>
        <div className={style.col1}>
          <img className={style.roundImg} src={imageUrl} alt={'vendor'} width="240" height="109"/>
        </div>
        <div className={style.col2}>
          <div className={style.row}><h2>{title}</h2></div>
          <div className={style.row}><p>{location}</p></div>
          {/* <div className={style.row}><p>{address1}</p></div>
          <div className={style.row}><p>{address2}</p></div> */}
        <div className={style.row}>
          {/* <div className={style.col3}><p>{category.title}</p></div> */}
          {/* <div className={style.col3}><p>{category2}</p></div>
          <div className={style.col3}><p>{category3}</p></div> */}
        </div>
        </div>
        </div>
        }
        </div>
  );
}

export default VendorInfo;
