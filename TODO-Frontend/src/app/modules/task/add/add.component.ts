import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TaskService} from "../task.service";
import {ToastrService} from "ngx-toastr";
import {Task} from "../typings/Task.typings";

@Component({
  selector: 'app-add-task',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });

    if (data && data.task) {
      const task: Task = data.task;
      this.taskForm.patchValue({
        name: task.name,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.status
      });
      this.isEditMode = true;
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isEditMode) {
        const taskId = this.data.task.id;
        this.taskService.updateTask(taskId, this.taskForm.value).subscribe(() => {
          this.toastr.success("Updated Successfully");
          this.dialogRef.close();
        }, (error) => {
          this.toastr.error(error.error.error)
        });
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe(() => {
          this.toastr.success("Updated Successfully");
          this.dialogRef.close();
        }, (error) => {
          this.toastr.error(error.error.error)
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
