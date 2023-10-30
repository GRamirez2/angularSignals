import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, MatIconModule],
  templateUrl: "./user-list.component.html",
  styles: [
    `
      .containerCol {
        display: flex;
        flex-direction: column;
      }
      .green_font {
        color: green;
        text-decoration: underline;
      }
    `,
  ],
})
export class UserListComponent {
  @Input() users?: any;
  @Input() selectedUserId?: any;
  @Output() selectUserRequest = new EventEmitter<any>();

  onSelected(id: number): void {
    this.selectUserRequest.emit(id);
  }

  trackByFn(user: any) {
    return user.id;
  }
}
