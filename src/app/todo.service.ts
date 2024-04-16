import { ToDo } from "./todo";
import { DestroyRef, Injectable, effect, inject, signal } from "@angular/core";
import { FetchDataService } from "./fetch-data.service";
import { HttpClient } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  http = inject(HttpClient);
  userService = inject(FetchDataService);
  private todoUrl = "https://jsonplaceholder.typicode.com/todos?userId=";

  // Create a writable signal.
  // Use an effect to react to the userId changes
  // Get the data using the parameter
  // Use takeUntilDestroyed() to ensure the Observable is destroyed
  //  when the component is destroyed
  // Subscribe to that Observable
  // In the Observer, set the writable signal.
  public userTasks = signal<ToDo[]>([]); // Writable signal
  private destroyRef = inject(DestroyRef); // Current "context" (this component)
  public tasksEffect = effect(() =>
    this.http
      .get<ToDo[]>(this.todoUrl + this.userService.selectedUserId())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => of([] as ToDo[]))
      )
      .subscribe((tasks) => this.userTasks.set(tasks))
  );

  markComplete(task: ToDo) {
    // Long way:
    this.userTasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, completed: true } : t))
    );
    // Short way:// no longer works after v17
    // this.userTasks.mutate(() => (task.completed = !task.completed));
    this.logger("Task Completion Update = ", task.id);
  }

  updateTask(newTask: any): void {
    this.userTasks.update((tasks) =>
      tasks.map((t) =>
        t.id === newTask.id ? { ...t, title: newTask.title } : t
      )
    );
    this.logger("Updated Task = ", newTask.id);
  }

  private logger(text: string, n: number) {
    return this.userTasks().map((t) =>
      t.id === n ? console.log(text, t) : "not found"
    );
  }
}
