export const API_URL = 'https://api.exchangeratesapi.io/';

export const TIME_INTERVAL = 1000;
export const PERIOD = 5;

const date = new Date();
date.setDate(date.getDate() - PERIOD);
export const START_DATE = date;
export const TODAY = new Date();

export const BASE_CUR = 'RUB';
