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
export class MaestrosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService
  ) { }

  public esquemaMaestro() {
    return {
      rol: '',
      id_trabajador: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      telefono: '',
      rfc: '',
      cubiculo: '',
      area_investigacion: '',
      materias_json: []
    };
  }

  public validarMaestro(data: any, editar: boolean) {
    const error: any = {};

    if (!this.validatorService.required(data['id_trabajador'])) {
      error['id_trabajador'] = this.errorService.required;
    } else if (!this.validatorService.max(data['id_trabajador'], 10)) {
      error['id_trabajador'] = this.errorService.max(10);
    } else if (!/^[A-Za-z0-9]+$/.test(data['id_trabajador'])) {
      error['id_trabajador'] = 'Solo se permiten letras y numeros';
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

    if (!this.validatorService.required(data['telefono'])) {
      error['telefono'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['rfc'])) {
      error['rfc'] = this.errorService.required;
    } else if (!this.validatorService.min(data['rfc'], 12)) {
      error['rfc'] = this.errorService.min(12);
      alert('La longitud de caracteres del RFC es menor, deben ser 12');
    } else if (!this.validatorService.max(data['rfc'], 13)) {
      error['rfc'] = this.errorService.max(13);
      alert('La longitud de caracteres del RFC es mayor, deben ser 13');
    } else if (!/^[A-Za-z0-9]+$/.test(data['rfc'])) {
      error['rfc'] = 'Solo se permiten letras y numeros';
    }

    if (!this.validatorService.required(data['cubiculo'])) {
      error['cubiculo'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['area_investigacion'])) {
      error['area_investigacion'] = this.errorService.required;
    }

    if (!Array.isArray(data['materias_json']) || data['materias_json'].length === 0) {
      error['materias_json'] = this.errorService.required;
    }

    return error;
  }

  public registrarMaestro(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/maestros/`, data, httpOptions);
  }

  public actualizarMaestro(id: number | string, data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/maestros/${id}/`, data, httpOptions);
  }

  public obtenerMaestros(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/maestros/`, httpOptions);
  }

  public obtenerMaestro(id: number | string): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/maestros/${id}/`, httpOptions);
  }

  public eliminarMaestro(id: number | string): Observable<any> {
    return this.http.delete<any>(`${environment.url_api}/maestros/${id}/`, httpOptions);
  }
}
