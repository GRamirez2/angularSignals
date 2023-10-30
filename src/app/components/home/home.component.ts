import { ToDo } from "./../../todo";
import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FetchDataService } from "src/app/fetch-data.service";
import { TodoService } from "src/app/todo.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ThemePalette } from "@angular/material/core";
import { FormListComponent } from "../form-list/form-list.component";
import { UserListComponent } from "../user-list/user-list.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormListComponent,
    UserListComponent,
  ],
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent {
  fetchDataService = inject(FetchDataService);
  todoService = inject(TodoService);
  // Expose the state as signals
  users = this.fetchDataService.users;
  selectedUserId = this.fetchDataService.selectedUserId;

  userTasks = this.todoService.userTasks;

  color: ThemePalette = "primary";

  // computed
  completedCount = computed(
    () => this.userTasks().filter((task) => task.completed).length
  );

  trackByFn(user: any) {
    return user.id;
  }

  onSelected(id: number) {
    this.fetchDataService.setSelectedUser(id);
  }

  markComplete(task: ToDo) {
    this.todoService.markComplete(task);
  }

  handleTaskUpdateRequest($event: any) {
    this.todoService.updateTask($event);
  }
}
