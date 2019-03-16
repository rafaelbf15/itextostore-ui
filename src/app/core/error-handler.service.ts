import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private msgService: MessageService
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else

    if (errorResponse.status >= 400 && errorResponse.status <= 499) {

      let errors;

      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse;

        msg = errors.error[0].mensagemUsuario;

      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }
    this.msgService.add({severity: 'error', summary: `${msg}`});
  }

}
