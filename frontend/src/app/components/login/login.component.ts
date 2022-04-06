import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;

  constructor(
    private _flash: FlashMessagesService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {}

  onLogin() {
    if (this.email == undefined || this.password == undefined) {
      this._flash.show('All fields are required', { cssClass: 'alert-danger' })
      return false;
    }

    const user = {
      email: this.email,
      password: this.password
    }

    this._userService.auth(user).subscribe((resp: any) => {
      if (!resp.success) {
        this._flash.show(resp.message, { cssClass: 'alert-danger' });
        return false;
      }
      this._userService.saveUserData(resp.token, resp.user);
      this._flash.show('Logged in successfully', { cssClass: 'alert-success' });
      return this._router.navigate(['/main']);
    });
    return true;
  }
}