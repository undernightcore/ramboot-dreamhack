import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logIn() {
    this.authService.logIn(this.email, this.password).subscribe({
      next: () => {
        this.snackBar.open('Has iniciado sesión correctamente', '', {duration: 2000});
      },
      error: () => {
        this.snackBar.open('Ha habido un error', '', {duration: 2000});
      }
    })
  }

}
