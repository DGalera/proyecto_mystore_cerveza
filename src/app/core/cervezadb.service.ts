
import { ICerveza } from '../share/interfaces';
import { Storage } from '@ionic/storage';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
}


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
