import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Todos {
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  description: string;
  todosCollection: AngularFirestoreCollection<Todos>;
  todos: Observable<Todos[]>;
  // costruttore
  constructor(private afs: AngularFirestore) { }
  ngOnInit() {
    this.todosCollection = this.afs.collection('todos');
    this.todos = this.todosCollection.valueChanges();
  }

  addTodo() {
    this.afs.collection('todos').add({
      'description': this.description,
      'done': false
    });
  }


}
