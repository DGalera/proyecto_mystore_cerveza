import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Cerveza } from './cerveza';

@Injectable({
  providedIn: 'root'
})
export class CervezaService {
  private cervezasUrl = 'api/cervezas';

  constructor(private http: HttpClient) { }

  getCervezas(): Observable<Cerveza[]> {
    return this.http.get<Cerveza[]>(this.cervezasUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxCervezaId(): Observable<Cerveza> {
    return this.http.get<Cerveza[]>(this.cervezasUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getCervezaById(id: number): Observable<Cerveza> {
    const url = `${this.cervezasUrl}/${id}`;
    return this.http.get<Cerveza>(url)
      .pipe(
        tap(data => console.log('getCerveza: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCerveza(cerveza: Cerveza): Observable<Cerveza> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    cerveza.id = null;
    return this.http.post<Cerveza>(this.cervezasUrl, cerveza, { headers: headers })
      .pipe(
        tap(data => console.log('createCerveza: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteCerveza(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.cervezasUrl}/${id}`;
    return this.http.delete<Cerveza>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteCerveza: ' + id)),
        catchError(this.handleError)
      );
  }

  updateCerveza(cerveza: Cerveza): Observable<Cerveza> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.cervezasUrl}/${cerveza.id}`;
    return this.http.put<Cerveza>(url, cerveza, { headers: headers })
      .pipe(
        tap(() => console.log('updateCerveza: ' + cerveza.id)),
        // Return the product on an update
        map(() => cerveza),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
