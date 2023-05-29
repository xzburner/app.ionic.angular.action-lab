export interface DailyExchangeRateModel {
  data: ExchageRateData[],
}

export interface ExchageRateData {
  close: number,
  date: Date,
  high: number,
  low: number;
  open: number,
}
