import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";
import {Task} from "./typings/Task.typings";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  getTasks() {
    return this.http.get(environment.API_URL + 'tasks/').pipe(
      map((response: any) => response.body)
    );
  }

  createTask(task: Task) {
    return this.http.post(environment.API_URL + 'tasks/', task).pipe(
      map((response: any) => response.body)
    );
  }

  updateTask (id: string,task: Task) {
    return this.http.put(environment.API_URL + 'tasks/' + id, task).pipe(
      map((response: any) => response.body)
    );
  }

  deleteTask(id: Number) {
    return this.http.delete(environment.API_URL + 'tasks/' + id);
  }
}
