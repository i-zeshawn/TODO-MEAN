import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {TaskService} from "../task.service";
import {Task} from "../typings/Task.typings";
import {AddTaskComponent} from "../add/add.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'dueDate',
    'priority',
    'status',
    'description',
    'createdAt',
    'actions'
  ];
  dataSource!: MatTableDataSource<Task>;
  tasks!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService, private dialog: MatDialog, private toastrService: ToastrService) {
    this.getTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  openAddTaskModal() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTasks()
    });
  }

  openEditTaskModal(task: Task) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '800px',
      data: {task}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTasks()
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe((data) => {
      this.toastrService.success("Task Deleted Successfully");
      this.getTasks()
    }, (error) => {
      this.toastrService.error(error.error.message)
    })
  }
}
