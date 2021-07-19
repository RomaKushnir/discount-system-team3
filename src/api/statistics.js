import axios from './axiosClient';

export const getStatistics = (searchParams) => axios.get(`/statistics${searchParams}`);

export const getStatisticsExport = (searchParams) => axios.get(`/statistics/export${searchParams}`);
