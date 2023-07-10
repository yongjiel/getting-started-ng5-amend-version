import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; // install rxjs-compact
import { Card } from '../models/card'; // has to build this file.
import 'rxjs/add/operator/map'; // if no this line. .map function down there not work


@Injectable()
export class CardService {
  private basePath = '/items';

  cardsRef: AngularFireList<Card>;
  cardRef:  AngularFireObject<Card>;

  //constructor(private http: HttpClient) { }
   constructor(private db: AngularFireDatabase) {
     this.cardsRef = db.list('/cards');  // this matches to firebase db cards data strucutre.
   }

  getCardsList(): Observable<Card[]> {
    return this.cardsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
          console.log("'''" + "'''" + snap.key);
          console.log(snap.payload.val());
          return Object.assign(snap.payload.val(), 
                            { $key: "Firebase ID: "+snap.key }) } ); // assign value to Card in /models
    });
  }

  getCard(key: string): Observable<Card | null> {
    const cardPath = `${this.basePath}/${key}`;
    const card = this.db.object(cardPath).valueChanges() as Observable<Card | null>;
    return card;
  }

  createCard(card: Card): Card {
    //this.cardsRef.push(card);
    const result = this.cardsRef.push(card);
    //card.$key = result.key;
    return card;
  }

  updateCard(key: string, value: any): void {
    this.cardsRef.update(key, value);
  }

  deleteCard(key: string): void {
    this.cardsRef.remove(key);
  }

  deleteAll(): void {
    this.cardsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }

  // get() {
  //   return this.http.get(`/api/v1/cards.json`);
  // }

  // add(payload) {
  //   return this.http.post(`/api/v1/cards.json`, {text: payload.trim()});
  // }

  // remove(payload) {
  //   return this.http.delete(`/api/v1/cards/${payload.id}.json`);
  // }

  // update(payload) {
  //   return this.http.patch(`/api/v1/cards/${payload.id}.json`, payload);
  // }
}
