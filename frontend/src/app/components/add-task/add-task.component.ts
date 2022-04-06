import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  name: string | undefined;
  done: boolean | undefined;
  owner: string | undefined;

  constructor(
    private _tasks: TasksService,
    private _flash: FlashMessagesService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    const user = this._userService.getCurrentUser();
    this.owner = user.id;
    this.done = false;
  }

  onAddTask() {
    if (this.name == undefined) {
      this._flash.show('Task name is requried', { cssClass: 'alert-danger' });
      return false;
    }

    const task = {
      name: this.name,
      owner: this.owner,
      done: this.done
    }

    this._tasks.saveTask(task).subscribe(() => {
      this._flash.show('Task Saved', { cssClass: 'alert-success' });
      this._router.navigate(['/main']);
    });

    return true;
  }

}
