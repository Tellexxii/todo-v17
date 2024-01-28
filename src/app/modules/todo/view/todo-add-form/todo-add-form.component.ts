import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Priority, priorityLocalize, TodoForm} from "../../models/todo";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'app-todo-add-form',
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    templateUrl: './todo-add-form.component.html',
    styleUrl: './todo-add-form.component.scss'
})
export class TodoAddFormComponent {
    @Output() onSubmit: EventEmitter<TodoForm> = new EventEmitter<TodoForm>()

    todoForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        priority: new FormControl(Priority.None, Validators.required)
    });

    priorityOptions = Object.entries(priorityLocalize);

    onSubmitClick() {
        if (this.todoForm.valid) {
            this.onSubmit.next({
                title: this.todoForm.value.title as string,
                description: this.todoForm.value.description as string,
                priority: this.todoForm.value as unknown as Priority
            })
        }
    }

    protected readonly priorityLocalize = priorityLocalize;
}
