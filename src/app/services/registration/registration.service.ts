import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Urls } from 'src/app/enums/urls';
import { RegistrationRequest } from 'src/app/_shared/interfaces/registration-request';


@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) { }

  save(data: RegistrationRequest) {
    return this.http.post(Urls.registration, data);
  }
}
