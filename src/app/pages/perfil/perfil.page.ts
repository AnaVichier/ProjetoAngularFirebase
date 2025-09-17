import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  posts: any[] = [];
  novoPost = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregarPerfil();
    this.carregarPosts();
  }

  carregarPerfil() {
    this.api.post('usuario/perfil', { token: localStorage.getItem('token') }).subscribe({
      next: (res) => {
        this.usuario = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  carregarPosts() {
    this.api.get('posts').subscribe({  // precisa de rota GET no Laravel
      next: (res) => {
        this.posts = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  criarPost() {
    this.api.post('post/create', {
      token: localStorage.getItem('token'),
      conteudo: this.novoPost,
    }).subscribe({
      next: () => {
        this.novoPost = '';
        this.carregarPosts(); // recarrega lista
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
