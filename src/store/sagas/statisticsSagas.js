import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as types from '../actionTypes';
import * as actions from '../actions';
import * as api from '../../api';

export function* getStatistics({ payload }) {
  try {
    const searchParams = `?dateFrom=${payload.dateFrom}&dateTo=${payload.dateTo}`;

    const response = yield call(api.statistics.getStatistics, searchParams);

    yield put(actions.statisticsActions.getStatisticsSuccess(response.data));
  } catch (error) {
    console.error(error);
    yield put(actions.statisticsActions.getStatisticsFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getStatisticsExport({ payload }) {
  const { formattedPeriod, fileName } = payload;
  try {
    const searchParams = `?dateFrom=${formattedPeriod.dateFrom}&dateTo=${formattedPeriod.dateTo}`;

    const response = yield call(api.statistics.getStatisticsExport, searchParams);

    const link = document.createElement('a');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    yield put(actions.statisticsActions.getStatisticsExportSuccess(response.data));
  } catch (error) {
    console.error(error);
    yield put(actions.statisticsActions.getStatisticsExportFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_STATISTICS, getStatistics),
    takeEvery(types.GET_STATISTICS_EXPORT, getStatisticsExport)
  ]);
}
