export interface DailyExchangeRateModel {
  data: ExchageRateData[],
  from: string,
  lastUpdatedAt: Date,
  rateLimitExceeded: boolean,
  success: boolean,
  to: string,
}

export interface ExchageRateData {
  close: number,
  date: Date,
  high: number,
  low: number;
  open: number,
}
