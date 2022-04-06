import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AppUtil from '../common/app.util';

@Injectable()

export class TasksService {

  constructor(private _http: HttpClient) {}

  createAuthHeader() {
    const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  saveTask(task: any) {
    return this._http.post('/api/task/create', task, { 'headers': this.createAuthHeader() });
  }

  getTasks(query: any) {
    return this._http.post('/api/tasks', query, { 'headers': this.createAuthHeader() })
  }
  
  deleteTask(taskId: any) {
    const url = `/api/task/${taskId}`;
    return this._http.delete(url, { 'headers': this.createAuthHeader() });
  }

}
