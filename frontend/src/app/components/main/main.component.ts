import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tasks: any;

  constructor(
    private _taskService: TasksService,
    private _userService: UserService,
    private _flash: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._fetchTasks();
  }

  deleteTask(taskId: any) {
    this._taskService.deleteTask(taskId).subscribe((resp: any) => {
      if (resp.message == 'Task deleted') {
        this._flash.show('Task Deleted', { cssClass: 'alert-success' });
        this._fetchTasks();
      } else {
        this._flash.show(resp.message, { cssClass: 'alert-danger' });
      }
      this._router.navigate(['/main']);
    })
  }

  private _fetchTasks() {
    const currentUser = this._userService.getCurrentUser();
    const query = { owner: currentUser.id };
    this._taskService.getTasks(query).subscribe((resp: any) => {
      this.tasks = resp.tasks;
    })
  }
}
