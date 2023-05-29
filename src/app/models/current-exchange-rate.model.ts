export interface CurrentExchangeRateModel {
  "exchangeRate": number,
  "fromSymbol": string,
  "lastUpdatedAt": Date,
  "rateLimitExceeded": boolean,
  "success": boolean,
  "toSymbol": string,
}
