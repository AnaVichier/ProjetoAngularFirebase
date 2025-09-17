import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  senha = '';
  erro = '';

  constructor(private api: ApiService, private router: Router) {}

  fazerLogin() {
    this.api.post('usuario/login', {
      email: this.email,
      password: this.senha,
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/perfil']);
      },
      error: () => {
        this.erro = 'Email ou senha inválidos';
      },
    });
  }
}
