import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LivroService } from './../livro.service';

@Component({
  selector: 'app-livros-pesquisa',
  templateUrl: './livros-pesquisa.component.html',
  styleUrls: ['./livros-pesquisa.component.css']
})
export class LivrosPesquisaComponent implements OnInit {

  livros = [];
  pesquisa = '';
  displayCadastro = false;
  idLivro: number;
  livroEstante = [];
  capacidadeEstante: number;
  estante = false;


  constructor(
    private livroService: LivroService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private ngxSpinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    if (this.router.url === '/estante') {
      this.estante = true;
    }
    this.carregarLivros();
  }

  carregar() {
    this.carregarLivros();
  }

  carregarLivro(id) {
    this.ngxSpinner.show();
    this.displayCadastro = true;
    this.idLivro = id;
    this.router.navigate(['/livros', this.idLivro]);
    this.ngxSpinner.hide();
  }


  carregarLivros() {
    this.ngxSpinner.show();
    this.livroService.getLivros(this.pesquisa)
      .then((livros: any) => {
        this.livros = livros.content;
        this.ngxSpinner.hide();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  carregarEstante() {
    this.ngxSpinner.show();
    this.livroService.getLivros(this.pesquisa)
      .then((livros: any) => {
        this.livros = livros.content;
        this.filtrarLivrosEstante(this.capacidadeEstante);
        this.livros = this.livroEstante;
        this.ngxSpinner.hide();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }


  filtrarLivrosEstante(capacidadeEstante) {
    this.livroEstante = [];
    for (const livro of this.livros) {
      if (livro.peso <= capacidadeEstante ) {
        this.livroEstante.push(livro);
        capacidadeEstante = capacidadeEstante - livro.peso;
      }
    }
  }

  alterarCapacidadeEstante(capacidadeEstante) {
    this.capacidadeEstante = capacidadeEstante;
    this.carregarEstante();
  }

  showDialog() {
    this.displayCadastro = true;
  }

}
