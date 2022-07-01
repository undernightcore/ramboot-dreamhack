import { Component, OnInit } from '@angular/core';
import {Entry} from "../../interfaces/entry";
import {EntryService} from "../../services/entry.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  entry: Entry = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    comprado: false,
    jugado: false
  }

  constructor(private entryService: EntryService, private snackBar: MatSnackBar) {}

  create() {
    this.entryService.create(this.entry).subscribe({
      next: (data) => {
        this.snackBar.open('Has añadido el usuario correctamente', '', {duration: 2000});
        this.empty();
      },
      error: (data) => {
        this.snackBar.open('Ya existe un usuario con este correo', '', {duration: 2000});
      }
    });
  }

  empty() {
    this.entry = {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      comprado: false,
      jugado: false
    }
  }
}
