import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private http: HttpClient) { }

  public getCurrentExchangeRate(apiKey: string, fromSymbol: string, toSymbol: string): Observable<any> {
    const url = `${environment.api.getCurrentExchangeRate}?apiKey=${apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`;
    return this.http.get(url);
  }

  public getDailyExchangeRate(apiKey: string, fromSymbol: string, toSymbol: string): Observable<any> {
    const url = `${environment.api.getDailyExchangeRate}?apiKey=${apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`;
    return this.http.get(url);
  }
}
