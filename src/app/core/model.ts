export class Autor {
  id: number;
  nome: string;
}

export class Livro {
  id: number;
  titulo: string;
  autor: Autor;
  preco: number;
  peso: number;
}
