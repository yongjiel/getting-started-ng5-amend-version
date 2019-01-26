import { Component, EventEmitter, OnInit, Output, HostListener, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { takeWhile, debounceTime, filter } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import { Card } from '../models/card';

@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.css'],
  host: {'class': 'col-4'}
})
export class NewCardInputComponent implements OnInit {
  public newCard: any = {text: ''};
  @Output() onCardAdd = new EventEmitter<string>();
  newCardForm: FormGroup;
  @ViewChild('form') public form: NgForm;
  private alive = true;
  
  constructor(fb: FormBuilder) {
    this.newCardForm = fb.group({
      'text': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
    this.newCardForm.valueChanges.pipe(
        filter((value) => this.newCardForm.valid),
      debounceTime(500),
      takeWhile(() => this.alive)
    ).subscribe(data => {
       console.log(data);
    });

  }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.code === "Enter" && this.newCardForm.valid) {
        //this.addCard(this.newCard.text);
        // Original is this.addCard(this.newCardForm.controls['text'].value); Just
        // pass text only to the firebase. Firebase just keeps the text but not 
        // the Card object. So it is not consistant with the action's payload which
        // is the card object but not just card's text.
        this.addCard(new Card(this.newCardForm.controls['text'].value));
       }
    }


  addCard(card) {
    this.onCardAdd.emit(card);
    //this.newCard.text = '';
    this.newCardForm.controls['text'].setValue('');
  }

}
