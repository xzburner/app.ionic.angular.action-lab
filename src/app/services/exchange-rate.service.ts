import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private http: HttpClient) { }

  public getExchangeRate(apiUrl: string, apiKey: string, fromSymbol: string, toSymbol: string): Observable<any> {
    const url = `${apiUrl}?apiKey=${apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`;
    return this.http.get(url);
  }
}
