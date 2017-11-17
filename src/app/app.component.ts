import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Todos {
  description: string;
  done: boolean;
}

interface Todo extends Todos {
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  description: string;
  todosCollection: AngularFirestoreCollection<Todos>;
  todos: any;
  constructor(private afs: AngularFirestore) { }
  ngOnInit() {
    this.todosCollection = this.afs.collection('todos');
    this.todos = this.todosCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  addTodo() {
    this.afs.collection('todos').add({
      'description': this.description,
      'done': false
    });
  }

  updateTodo(id, event) {
    const checkedVal = event.target.checked;
    this.afs.doc('todos/' + id).update({
      'done': checkedVal
    });
  }

  removeTodo(id){
    this.afs.doc('todos/' + id).delete();
  }

}
