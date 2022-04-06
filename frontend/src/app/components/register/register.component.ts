import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(
    private _flash: FlashMessagesService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() { }

  onRegister() {
    if (this.name == undefined || this.email == undefined || this.password == undefined) {
      this._flash.show('All fields are required', { cssClass: 'alert-danger' })
      return false;
    }
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    this._userService.createAccount(user).subscribe((resp: any) => {
      if (!resp.success) {
        this._flash.show(resp.message, { cssClass: 'alert-danger' });
        return false;
      }
      this._flash.show('Account was created', { cssClass: 'alert-success' });
      return this._router.navigate(['/login']);
    });
    return true;
  }
}
