
import { ICerveza } from '../share/interfaces';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class CervezadbService {
  private cervezasUrl = 'http://localhost:8000/cervezas';

  constructor(
    private http: HttpClient
  ) { }
  
  read_Cervezas(): Observable<ICerveza[]>{
    return this.http.get<ICerveza[]>(this.cervezasUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  read_CervezaById(id: any): Observable<ICerveza> {
    const url = this.cervezasUrl + "/" + id;
    return this.http.get<ICerveza>(url)
      .pipe(
        tap(data => console.log('getCerveza: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  create_Cerveza(cerveza): Observable<ICerveza> {
    return this.http.post<ICerveza>(this.cervezasUrl, cerveza)
      .pipe(
        tap(data => console.log('createCerveza: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete_Cerveza(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.cervezasUrl + "/"+ id;
    return this.http.delete(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteCerveza: ' + id)),
        catchError(this.handleError)
      );
  }

  update_Cerveza(cerveza: ICerveza, id: string): Observable<ICerveza> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.cervezasUrl}/${id}`;
    return this.http.put<ICerveza>(url, cerveza, { headers: headers })
      .pipe(
        tap(() => console.log('updateCerveza: ' + id)),
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



/*
@Injectable({
  providedIn: 'root'
})
export class CervezadbService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Cerveza(record) {
    return this.firestore.collection('cervezas').add(record);
  }
  read_CervezaById(record_id) {
    return this.firestore.doc('cervezas/' + record_id).valueChanges();
  }
  read_Cervezas() {
    return this.firestore.collection('cervezas').snapshotChanges();
  }
  update_Cerveza(recordID, record) {
    this.firestore.doc('cervezas/' + recordID).update(record);
  }
  delete_Cerveza(record_id) {
    this.firestore.doc('cervezas/' + record_id).delete();
  }
}*/


/*@Injectable({
  providedIn: 'root'
})

export class CervezadbService {
  auxCerveza: ICerveza;
  auxCervezaList: ICerveza[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: ICerveza) {
    this.storage.set(reference, {
      id: value.id, name: value.name, image: value.image, description:
        value.description
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<ICerveza> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<ICerveza[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: ICerveza) => this.auxCervezaList.push(data)
        );
      });
      return this.auxCervezaList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
}*/
