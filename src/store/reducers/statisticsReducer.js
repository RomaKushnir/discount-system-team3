import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  statistics: null,
  getStatisticsStatus: helpers.getDefaultState(),
  statisticsExport: null,
  getStatisticsExportStatus: helpers.getDefaultState()
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATISTICS: {
      return {
        ...state,
        getStatisticsStatus: helpers.getRequestState()
      };
    }
    case types.GET_STATISTICS_SUCCESS: {
      const successMessage = 'Success';
      return {
        ...state,
        statistics: action.payload,
        getStatisticsStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.GET_STATISTICS_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getStatisticsStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_STATISTICS_STATUS: {
      return {
        ...state,
        getStatisticsStatus: helpers.getDefaultState()
      };
    }
    case types.GET_STATISTICS_EXPORT: {
      return {
        ...state,
        getStatisticsExportStatus: helpers.getRequestState()
      };
    }
    case types.GET_STATISTICS_EXPORT_SUCCESS: {
      const successMessage = 'Success';
      return {
        ...state,
        statisticsExport: action.payload,
        getStatisticsExportStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.GET_STATISTICS_EXPORT_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getStatisticsExportStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_STATISTICS_EXPORT_STATUS: {
      return {
        ...state,
        getStatisticsExportStatus: helpers.getDefaultState()
      };
    }
    default:
      return state;
  }
};

export default statisticsReducer;
