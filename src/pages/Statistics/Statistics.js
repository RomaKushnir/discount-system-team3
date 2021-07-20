import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from 'react-date-picker';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import * as actions from '../../store/actions';
import styles from './Statistics.module.scss';
import PageWrapper from '../../components/PageWrapper';
import Button from '../../components/Button';
import PieChartComponent from '../../components/PieChartComponent';
import Vocabulary from '../../translations/vocabulary';
import COLORS from '../../utilities/chartColorOptions';
import history from '../../history';
import Routes from '../../routes';

function getMonthStart() {
  const today = new Date(Date.now());

  const formattedMonth = today.toLocaleDateString('en-GB', {
    month: '2-digit'
  });

  return `${formattedMonth}-01-${today.getFullYear()}`;
}

function formatDate(value) {
  const formattedDate = value.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('.');

  return `${formattedDate}`;
}

function Statistics() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [period, setPeriod] = useState(
    {
      dateFrom: new Date(getMonthStart()),
      dateTo: new Date(Date.now())
    }
  );

  useEffect(() => {
    const formattedPeriod = {
      dateFrom: formatDate(period.dateFrom),
      dateTo: formatDate(period.dateTo)
    };
    dispatch(actions.statisticsActions.getStatistics(formattedPeriod));
    // eslint-disable-next-line
  }, []);

  const statistics = useSelector((state) => state.statisticsReducer.statistics);
  const getStatistics = useSelector((state) => state.statisticsReducer.getStatisticsStatus);

  const categoryStatistics = statistics?.popularCategoriesStats.map((el, index) => ({
    name: el.title,
    value: el.quantity,
    color: COLORS[index]
  }));

  const vendorStatistics = statistics?.popularVendorsStats.map((el, index) => ({
    name: el.title,
    value: el.quantity,
    id: el.id,
    color: COLORS[index]
  }));

  const dateFromHandler = (value) => {
    setPeriod({ ...period, dateFrom: value });
  };
  const dateToHandler = (value) => {
    setPeriod({ ...period, dateTo: value });
  };

  const onUpdate = () => {
    const formattedPeriod = {
      dateFrom: formatDate(period.dateFrom),
      dateTo: formatDate(period.dateTo)
    };
    dispatch(actions.statisticsActions.getStatistics(formattedPeriod));
  };

  console.log(statistics);

  const onCellClick = (vendorId) => {
    if (!vendorId) {
      return;
    }
    history.push(generatePath(Routes.VENDOR_ID, { id: vendorId }));
  };

  const onDiscountClick = (discountId) => {
    if (!discountId) {
      return;
    }

    console.log(discountId);
  };

  if (getStatistics.loading) {
    return (
      <PageWrapper>
        <div className={styles.contentWrapper}>
          <div className = {styles.loadingContainer}>
            <CircularProgress />
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className={styles.contentWrapper}>
        <div className = {styles.dateButtonsContainer}>
          <div className={styles.dateContainer}>
              <div className={styles.labelInputRow}>
                <label className = {styles.label}>{t(Vocabulary.FROM)}</label>
                <DatePicker
                  format="dd-MM-y"
                  name="dateFrom"
                  className={styles.customDatePicker}
                  value={period.dateFrom}
                  onChange={dateFromHandler}
                  returnValue="start"
                />
              </div>
              <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
                <label className = {styles.label}>{t(Vocabulary.TO)}</label>
                <DatePicker
                  format="dd-MM-y"
                  name="dateTo"
                  className={styles.customDatePicker}
                  value={period.dateTo}
                  onChange={dateToHandler}
                  returnValue="end"
                  minDate={new Date(period.dateFrom)}
                />
              </div>
          </div>
          <div className = {styles.buttons}>
            <div className = {styles.button}>
              <Button
                btnText = {t(Vocabulary.UPDATE)}
                onClick = {onUpdate}
                className = {styles.button}
              />
            </div>
            <div className = {styles.button}>
              <Button
                btnText = {t(Vocabulary.EXPORT_TO_EXCEL)}
                onClick = {onUpdate}
                className = {styles.button}
              />
            </div>
          </div>
        </div>
        <div className = {styles.dataContainers}>
          { categoryStatistics && <div className = {styles.pieChart}>
            <PieChartComponent
              data = {categoryStatistics}
              width = "280"
              title = "Activated discounts by category"
            />
          </div>}
          { vendorStatistics && <div className = {styles.pieChart}>
            <PieChartComponent
              data = {vendorStatistics}
              width = "280"
              title = "Activated discounts by vendor"
              onCellClick = {onCellClick}
              cursor = "pointer"
            />
          </div>}
          { statistics?.popularDiscountsStats && <div className = {styles.list}>
            <div className = {styles.listTitle}>Most viewed discounts (since inception)</div>
            <ul className = {styles.listItems}>
              {statistics?.popularDiscountsStats.map((el) => (
              <li key = {el.id} onClick = {() => onDiscountClick(el.id)} className = {styles.discount}>
                {el.quantity || el.othersQuantity} - {el.title || el.othersTitle}
              </li>))}
            </ul>
          </div>}
          { statistics?.mostActiveUsersStats && <div className = {styles.list}>
            <div className = {styles.listTitle}>Most active users</div>
            <ul className = {styles.listItems}>
              {statistics?.mostActiveUsersStats.map((el) => (
              <li key = {el.id}>{el.quantity} - {el.lastName} {el.firstName}, {el.email}</li>))}
            </ul>
          </div>}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Statistics;
