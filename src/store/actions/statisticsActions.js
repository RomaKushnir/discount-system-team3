import * as types from '../actionTypes';

export function getStatistics(payload) {
  return {
    type: types.GET_STATISTICS,
    payload
  };
}

export function getStatisticsSuccess(payload) {
  return {
    type: types.GET_STATISTICS_SUCCESS,
    payload
  };
}

export function getStatisticsFailure(payload) {
  return {
    type: types.GET_STATISTICS_FAILURE,
    payload
  };
}

export function clearGetStatisticsStatus() {
  return {
    type: types.CLEAR_GET_STATISTICS_STATUS
  };
}

export function getStatisticsExport(payload) {
  return {
    type: types.GET_STATISTICS_EXPORT,
    payload
  };
}

export function getStatisticsExportSuccess(payload) {
  return {
    type: types.GET_STATISTICS_EXPORT_SUCCESS,
    payload
  };
}

export function getStatisticsExportFailure(payload) {
  return {
    type: types.GET_STATISTICS_EXPORT_FAILURE,
    payload
  };
}

export function clearGetStatisticsExportStatus() {
  return {
    type: types.CLEAR_GET_STATISTICS_EXPORT_STATUS
  };
}
