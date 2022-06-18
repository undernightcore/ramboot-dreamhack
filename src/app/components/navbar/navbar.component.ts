import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.authService.isAuthenticated().subscribe((data) => {
        this.authenticated = data;
      })
    })
  }

  logOut() {
    this.authService.logOut().subscribe({
      next: () => {
        this.snackBar.open('Has cerrado sesión Pablito', '', {duration: 2000});
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.snackBar.open('No se ha podido cerrar sesión lol', '', {duration: 2000});
      }
    })
  }

}
