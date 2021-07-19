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
  try {
    const searchParams = `?dateFrom=${payload.dateFrom}&dateTo=${payload.dateTo}`;

    const response = yield call(api.statistics.getStatisticsExport, searchParams);

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
