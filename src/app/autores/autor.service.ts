import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Autor } from './../core/model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  autorUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.autorUrl = `${environment.api}/autores`;
   }

   getAutores(): Promise<any> {
     return this.http.get(this.autorUrl)
      .toPromise()
      .then(response => response);
   }

   addAutores(autor: Autor): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.autorUrl, autor, {headers})
     .toPromise()
     .then(response => response);
  }

   remover(id): Promise<any> {
    return this.http.delete(`${this.autorUrl}/${id}`)
     .toPromise()
     .then(() => {});
  }

  atualizar(autor): Promise<any> {
   let headers = new HttpHeaders();
   headers = headers.append('Content-Type', 'application/json');
   return this.http.put(`${this.autorUrl}/${autor.id}`, autor, {headers})
     .toPromise()
     .then(response => {
       const autorAlterado = response;
       return autorAlterado;
     });
  }

}
