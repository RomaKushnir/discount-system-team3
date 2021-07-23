import { useState, useEffect, useCallback } from 'react';
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
import DiscountModal from '../../components/DiscountModal';
import { getMonthStart, formatDate } from '../../utilities/dateFormat';

function Statistics() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isDiscountModalShown, setIsDiscountModalShown] = useState(false);
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
    dispatch(actions.statisticsActions.getStatisticsExport(formattedPeriod));
    // eslint-disable-next-line
  }, []);

  const statistics = useSelector((state) => state.statisticsReducer.statistics);
  const getStatistics = useSelector((state) => state.statisticsReducer.getStatisticsStatus);
  const discountById = useSelector((state) => state.discountsReducer.discountById);
  const statisticsExport = useSelector((state) => state.statisticsReducer.statisticsExport);

  const categoryStatistics = statistics?.popularCategoriesStats.map((el, index) => ({
    name: el.title || el.othersTitle,
    value: el.quantity || el.othersQuantity,
    color: COLORS[index]
  }));

  const vendorStatistics = statistics?.popularVendorsStats.map((el, index) => ({
    name: el.title || el.othersTitle,
    value: el.quantity || el.othersQuantity,
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
    dispatch(actions.statisticsActions.getStatisticsExport(formattedPeriod));
  };

  const onExcelExport = () => {
    const formattedPeriod = {
      dateFrom: formatDate(period.dateFrom),
      dateTo: formatDate(period.dateTo)
    };

    const fileName = `Statistics${formattedPeriod.dateFrom.split('.')
      .join('_')}-${formattedPeriod.dateFrom.split('.').join('_')}.xlsx`;

    if (statisticsExport) {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([statisticsExport]));
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const onCellClick = (vendorId) => {
    if (!vendorId) {
      return;
    }
    history.push(generatePath(Routes.VENDOR_ID, { id: vendorId }));
  };

  const onDiscountClick = useCallback((discountId) => {
    if (!discountId) {
      return;
    }
    setIsDiscountModalShown(true);
    dispatch(actions.discountsActions.getDiscountById(discountId));
    const formattedPeriod = {
      dateFrom: formatDate(period.dateFrom),
      dateTo: formatDate(period.dateTo)
    };
    dispatch(actions.statisticsActions.getStatistics(formattedPeriod));
  }, [dispatch, period.dateFrom, period.dateTo]);

  const onDiscountModalClose = () => {
    setIsDiscountModalShown(false);
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
                onClick = {onExcelExport}
                className = {styles.button}
              />
            </div>
          </div>
        </div>
        <div className = {styles.dataContainers}>
          { categoryStatistics && <div className = {styles.pieChartContainer}>
          <div className = {styles.chartTitle}>{t(Vocabulary.ACTIVATED_DISCOUNTS_BY_CATEGORY)}</div>
            <PieChartComponent
              data = {categoryStatistics}
              width = "280"
            />
          </div>}
          { vendorStatistics && <div className = {styles.pieChartContainer}>
          <div className = {styles.chartTitle}>{t(Vocabulary.ACTIVATED_DISCOUNTS_BY_VENDOR)}</div>
            <PieChartComponent
              data = {vendorStatistics}
              width = "280"
              onCellClick = {onCellClick}
              cursor = "pointer"
            />
          </div>}
          { statistics?.popularDiscountsStats && <div className = {styles.list}>
            <div className = {styles.listTitle}>{t(Vocabulary.MOST_VIEWED_DISCOUNTS_SINCE_INCEPTION)}</div>
            <table className = {styles.listItems}>
              <thead>
                <tr>
                  <th>{t(Vocabulary.TITLE)}</th>
                  <th>{t(Vocabulary.VIEWS)}</th>
                </tr>
                </thead>
              <tbody>
                {statistics?.popularDiscountsStats.map((el) => (
                  <tr key = {el.id || el.othersTitle}
                    onClick = {() => onDiscountClick(el.id)} className = {styles.discount}>
                    <td>{el.title || el.othersTitle}</td>
                    <td className = {styles.quantity}>{el.quantity || el.othersQuantity}</td>
                  </tr>))}
              </tbody>
            </table>
          </div>}
          { statistics?.mostActiveUsersStats && <div className = {styles.list}>
            <div className = {styles.listTitle}>{t(Vocabulary.MOST_ACTIVE_USERS)}</div>
            <table className = {styles.listItems}>
              <thead>
                <tr>
                  <th>{t(Vocabulary.USER_NAME_AND_EMAIL)}</th>
                  <th>{t(Vocabulary.DISCOUNT_QUANTITY)}</th>
                </tr>
                </thead>
              <tbody>
                {statistics?.mostActiveUsersStats.map((el) => (
                <tr key = {el.id}>
                  <td>{el.lastName} {el.firstName}, {el.email}</td>
                  <td className = {styles.quantity}>{el.quantity}</td>
                </tr>))}
              </tbody>
            </table>
          </div>}
        </div>
      </div>
      <DiscountModal
        discount = {discountById}
        isOpen = {isDiscountModalShown}
        onClose = {onDiscountModalClose}
        doNotShowAdminButtons = {true}
      />
    </PageWrapper>
  );
}

export default Statistics;
