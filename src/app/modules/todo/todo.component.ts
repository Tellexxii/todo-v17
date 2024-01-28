import {Component, computed, effect, signal, untracked, WritableSignal} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {uuidv4} from "../../utils/uuid";
import {priorityLocalize, Todo, TodoForm} from "./models/todo";
import {TodoAddFormComponent} from "./view/todo-add-form/todo-add-form.component";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, DatePipe} from "@angular/common";
import {getRandomTodo} from "../../utils/random-todo";
import {TodoStoreService} from "../../services/todo-store.service";
import {asyncScheduler, debounceTime, map, Observable, tap, throttleTime} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
    selector: 'app-todo',
    standalone: true,
    imports: [
        MatCardModule,
        TodoAddFormComponent,
        MatButtonModule,
        DatePipe,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        AsyncPipe
    ],
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.scss'
})
export class TodoComponent {
    todos: WritableSignal<Todo[]>;
    todoAdded: WritableSignal<Todo | null> = signal(null);

    // todosView
    searchInput = signal('');

    todosView$: Observable<Todo[]>;

    constructor(private todosStore: TodoStoreService, private _snackBar: MatSnackBar) {
        // init

        this.todos = signal(this.todosStore.todos());

        //to Observable
        this.todosView$ = toObservable(this.searchInput).pipe(
            debounceTime(500, asyncScheduler),
            tap(console.log),
            map((searchInput) => searchInput === ''
                ? this.todos()
                : this.todos().filter(todo => todo.title.toLowerCase().includes(searchInput.toLowerCase())))
        )

        //effects

        effect(() => this.todosStore.setTodos(this.todos()), {allowSignalWrites: true})

        effect(() => {
            if (this.todoAdded() !== null) {
                const len = untracked(this.todos).length
                //const len = this.todos().length

                this._snackBar.open(
                    `You have added new todo - "${this.todoAdded()?.title}". You already have ${len}`,
                    `I'll do it later`,
                    {duration: 3000})
            }
        })
    }

    onTodoAdd(form: TodoForm) {
        const todoToAdd: Todo = {
            id: uuidv4(),
            createdAt: Date.now().toString(),
            title: form.title,
            description: form.description,
            isDone: false,
            priority: form.priority
        }

        this.todos.update((todos) =>
            [...todos, todoToAdd]);

        this.todoAdded.set(todoToAdd);
    }

    onTodoRemove(id: string) {
        this.todos.update((todos) =>
            todos.filter(todo => todo.id !== id));
    }

    addRandom() {
        const todoToAdd: Todo = getRandomTodo();

        this.todos.update((todos) => [...todos, todoToAdd]);
        this.todoAdded.set(todoToAdd);
    }

    onSearchInput($event: Event) {
        // @ts-ignore
        this.searchInput.set($event.target['value'])
    }

    protected readonly priorityLocalize = priorityLocalize;

    log() {
        console.log(this.todos());
    }
}

export type Sort = 'asc' | 'desc';
