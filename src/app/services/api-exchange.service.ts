import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, concat } from "rxjs";
import { catchError, delay, repeat } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiExchange {
  sources: string[] = [
    "https://www.cbr-xml-daily.ru/daily_json.ss",
    "https://www.cbr-xml-daily.ru/daily_json.s",
    "https://www.cbr-xml-daily.ru/daily_json.js"
  ];

  constructor(private _httpClient: HttpClient) {}

  public sourcesCall(): Observable<any> {
    const requests = this.sources.map(endpoint => {
      return this._httpClient.get(endpoint).pipe(
        delay(10000),
        repeat(),
        catchError(e => {
          return of(undefined);
        })
      );
    });
    return concat(...requests);
  }
}
