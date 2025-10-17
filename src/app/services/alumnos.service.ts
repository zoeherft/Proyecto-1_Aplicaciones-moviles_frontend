import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService
  ) { }

  public esquemaAlumno() {
    return {
      rol: '',
      matricula: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      curp: '',
      rfc: '',
      edad: '',
      telefono: '',
      ocupacion: ''
    };
  }

  public validarAlumno(data: any, editar: boolean) {
    const error: any = {};

    if (!this.validatorService.required(data['matricula'])) {
      error['matricula'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['first_name'])) {
      error['first_name'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['last_name'])) {
      error['last_name'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['email'])) {
      error['email'] = this.errorService.required;
    } else if (!this.validatorService.max(data['email'], 40)) {
      error['email'] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data['password'])) {
        error['password'] = this.errorService.required;
      }

      if (!this.validatorService.required(data['confirmar_password'])) {
        error['confirmar_password'] = this.errorService.required;
      }
    }

    if (!this.validatorService.required(data['fecha_nacimiento'])) {
      error['fecha_nacimiento'] = this.errorService.required;
    } else if (!this.validatorService.date(data['fecha_nacimiento'])) {
      error['fecha_nacimiento'] = this.errorService.betweenDate;
    }

    if (!this.validatorService.required(data['curp'])) {
      error['curp'] = this.errorService.required;
    } else if (!this.validatorService.min(data['curp'], 18)) {
      error['curp'] = this.errorService.min(18);
      alert('La longitud de caracteres del CURP es menor, deben ser 18');
    } else if (!this.validatorService.max(data['curp'], 18)) {
      error['curp'] = this.errorService.max(18);
      alert('La longitud de caracteres del CURP es mayor, deben ser 18');
    }

    if (!this.validatorService.required(data['rfc'])) {
      error['rfc'] = this.errorService.required;
    } else if (!this.validatorService.min(data['rfc'], 12)) {
      error['rfc'] = this.errorService.min(12);
      alert('La longitud de caracteres del RFC es menor, deben ser 12');
    } else if (!this.validatorService.max(data['rfc'], 13)) {
      error['rfc'] = this.errorService.max(13);
      alert('La longitud de caracteres del RFC es mayor, deben ser 13');
    }

    if (!this.validatorService.required(data['edad'])) {
      error['edad'] = this.errorService.required;
    } else if (!this.validatorService.numeric(data['edad'])) {
      error['edad'] = this.errorService.numeric;
    } else if (Number(data['edad']) < 15) {
      error['edad'] = 'La edad debe ser mayor o igual a 15 anios';
    }

    if (!this.validatorService.required(data['telefono'])) {
      error['telefono'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['ocupacion'])) {
      error['ocupacion'] = this.errorService.required;
    }

    return error;
  }

  public registrarAlumno(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/alumnos/`, data, httpOptions);
  }

  public actualizarAlumno(id: number | string, data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/alumnos/${id}/`, data, httpOptions);
  }

  public obtenerAlumnos(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/alumnos/`, httpOptions);
  }

  public obtenerAlumno(id: number | string): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/alumnos/${id}/`, httpOptions);
  }

  public eliminarAlumno(id: number | string): Observable<any> {
    return this.http.delete<any>(`${environment.url_api}/alumnos/${id}/`, httpOptions);
  }
}
