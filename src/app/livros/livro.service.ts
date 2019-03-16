import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Livro } from './../core/model';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  livrosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.livrosUrl = `${environment.api}/livros`;
   }

   getLivros(pesquisa): Promise<any> {
     let params = new HttpParams();
     params = params.append('pesquisa', `${pesquisa}`);
     return this.http.get(this.livrosUrl, {params})
      .toPromise()
      .then(response => response);
   }

   carregarLivro(id): Promise<any> {
     return this.http.get(`${this.livrosUrl}/${id}`)
      .toPromise()
      .then(response => response);
   }

   addLivros(livro): Promise<any> {
     let headers = new HttpHeaders();
     headers = headers.append('Content-Type', 'application/json');
     return this.http.post(this.livrosUrl, livro, {headers})
      .toPromise()
      .then(response => response);
   }

   removerLivros(livro): Promise<any> {
     return this.http.delete(`${this.livrosUrl}/${livro.id}`)
      .toPromise()
      .then(() => {});
   }

   atualizar(livro: Livro): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.livrosUrl}/${livro.id}`, livro, {headers})
      .toPromise()
      .then(response => {
        const livroAlterado = response;
        return livroAlterado;
      });
  }

}
