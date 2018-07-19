import { Component, OnInit } from '@angular/core';
import { MSALService } from '../../service/msal.service';
import { Router } from '@angular/router';
import { AuthenticationSandbox } from '../../sandbox/authentication.sandbox';

@Component({
  selector: 'ccw-auth',
  template: '<button (click)="Login()">Log In</button>'
})
export class LoginComponent{

  user: any;
  token:string;
  constructor(private authSandbox: AuthenticationSandbox) {

  }
  
  public Login(){
    const token: string = this.authSandbox.getToken();
    if (token === null || token === undefined || token === 'null') {
      this.authSandbox.login();
    }
    this.user=this.authSandbox.getUser();
    this.token=this.authSandbox.getToken();
  }

  ngOnInit() {

    
  }

}
