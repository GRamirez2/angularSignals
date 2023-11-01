import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ToDo } from "src/app/todo";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-form-list",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./form-list.component.html",
  inputs: ["id", "task"],
  styles: [
    `
      .formSize {
        width: 90%;
      }
      .taskName {
        width: 100%;
      }
    `,
  ],
})
export class FormListComponent implements OnChanges {
  // @Input() task?: ToDo; // instead of writing the intput here you can add them to the component object
  // @Input() id!: number;
  task?: ToDo;
  id!: number;
  @Output() taskUpdateRequest = new EventEmitter<any>();

  inputWidth: any = { width: "100px" };

  theTask = new FormGroup({
    name: new FormControl("", Validators.required),
  });

  ngOnChanges(changes: SimpleChanges) {
    // In a real app there could potentially exist multiple @Input() properties
    // and they all share the same lifecycle hook. Ideally you'd want to pick out
    // the individual property changes and only react to changes that actually happened.
    const valueChange = changes["task"];
    // If no change occured then valueChanges will be undefined.
    if (valueChange) {
      // update width of input form
      this.inputWidth = {
        width:
          ((this.task?.title ? this.task.title.length : 100) + 10) * 8 + "px",
      };
      // set value in form group
      this.theTask.patchValue({
        name: this.task?.title,
      });
    }
  }

  updateTask(): void {
    const newTask = {
      title: this.theTask.get("name")?.value || "",
      id: this.task?.id || 0,
    };
    this.taskUpdateRequest.emit(newTask);
  }
}
