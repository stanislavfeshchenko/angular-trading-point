import { TestBed } from '@angular/core/testing';

import { FormCnfigService } from './form-cnfig.service';

describe('FormCnfigService', () => {
  let service: FormCnfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCnfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
