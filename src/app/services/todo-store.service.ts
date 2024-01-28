import {effect, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Todo} from "../modules/todo/models/todo";

@Injectable({
    providedIn: 'root'
})
export class TodoStoreService {

    private readonly storeKey = 'todos';
    private readonly _todos: WritableSignal<Todo[]>;

    get todos(): Signal<Todo[]> {
        return this._todos.asReadonly();
    }

    constructor() {
        const todos = localStorage.getItem(this.storeKey)

        this._todos = todos && todos !== 'undefined' ? signal(JSON.parse(todos)) : signal([]);

        effect(() => {
            localStorage.setItem(this.storeKey, JSON.stringify(this._todos()));
        })
    }

    setTodos(todos: Todo[]) {
        this._todos.set(todos);
    }
}
