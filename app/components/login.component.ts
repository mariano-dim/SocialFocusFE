import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioCredentials } from '../models/UsuarioCredentials';
import { Usuario} from '../models/usuario';
import { UsuarioService} from '../services/usuario.service';


@Component({
  selector: 'login',
  templateUrl: 'app/components/login.component.html',
  providers: [UsuarioService]
})
export class LoginComponent {

  @Input() usuarioCredentials: UsuarioCredentials;
  usuario: Usuario;
  usuarios: Usuario[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private router: Router) {

       this.usuarioCredentials = new UsuarioCredentials('', '');
  }

  login() {
    // alert(`saved!!! ${JSON.stringify(this.usuarioCredentials.email)}`);
    // console.log('email:' + this.usuarioCredentials.email);
    // console.log('clave:' + this.usuarioCredentials.clave);

    // // this.usuario = this.uuarioService.validateUsuario(this.usuarioCredentials);
    // this.uuarioService.getAllUsuarios().subscribe(
    //    usu => this.usuarios = usu,
    //    error =>  this.errorMessage = <any>error);

    this.usuarioService
      .getAllUsuarios()
      .subscribe(
         /* happy path */ p => this.usuarios = p,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */() => this.isLoading = false);
  }



}


