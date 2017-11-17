import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// qui sopra ci sono gli import

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

  todosCollection: AngularFirestoreCollection<Todos>;
  todos: Observable<Todos[]>;

  constructor(private afs: AngularFirestore) { }
  ngOnInit() {
    this.todosCollection = this.afs.collection('todos');
    this.todos = this.todosCollection.valueChanges()
  }
}
