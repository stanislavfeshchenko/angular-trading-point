import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Urls } from 'src/app/enums/urls';
import { RegistrationField } from 'src/app/_shared/interfaces/registration-field';

@Injectable()
export class FormCnfigService {
  constructor(private http: HttpClient) { }

  getFormConfig(): Observable<RegistrationField[]> {
    return this.http.get<RegistrationField[]>(Urls.formConfig);
  }
}
