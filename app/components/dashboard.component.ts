import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Response } from '@angular/http';
import { UsuarioCredentials } from '../models/UsuarioCredentials';
import { UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/components/dashboard.component.html'
})
export class DashboardComponent {

  @Input() usuarioCredentials: UsuarioCredentials;
  public errorMessage: string = '';


  constructor(private uuarioService: UsuarioService, private router: Router) {


    console.log('Hola Consola');
  }
}