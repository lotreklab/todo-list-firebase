import { Component, OnInit, trigger, sequence, transition, animate, style, state } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BrowserModule } from '@angular/platform-browser';


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
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('anim', [
      transition('* => void', [
        style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)' }),
        sequence([
          animate(".25s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
          animate(".1s ease", style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none' }))
        ])
      ]),
      transition('void => active', [
        style({ height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none' }),
        sequence([
          animate(".1s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)' }))
        ])
      ])
    ])
  ],
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
          const state = 'active';
          return { id, data, state };
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
