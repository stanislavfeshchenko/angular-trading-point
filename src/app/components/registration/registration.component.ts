import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormCnfigService } from 'src/app/services/form-config/form-cnfig.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { FieldValidation } from 'src/app/_shared/interfaces/field-validation';
import { RegistrationField } from 'src/app/_shared/interfaces/registration-field';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    FormCnfigService,
    RegistrationService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  formConfig!: RegistrationField[];
  passwordHide = true;

  constructor(
    private formCnfigService: FormCnfigService,
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetch();
  }

  onSubmit() {
    this.registrationService
      .save(this.registrationForm.getRawValue())
      .subscribe({
        next: () => this.navigateToWelcomePage(),
        error: error => console.error(error)
      })
  }

  private fetch() {
    this.formCnfigService.getFormConfig()
    .subscribe({
      next: resp => {
        this.formConfig = resp;
        this.setupRegistrationForm(resp);
      },
      error: error => console.error(error),
      complete: () => setTimeout(()=> this.cdr.detectChanges())
    });
  }

  private getValidators(validatorsConfig: FieldValidation[]) {
    const validators: ValidatorFn[] = [];
    validatorsConfig.forEach(
      config => {
        switch (config.name) {
          case 'regex':
            validators.push(Validators.pattern(`${config.value}`));
            break;
          case 'maxlength':
            validators.push(Validators.maxLength(Number(config.value)));
            break;
          case 'minlength':
            validators.push(Validators.minLength(Number(config.value)));
            break;
          default:
            break;
        }
      }
    );
    return validators;
  }

  private setupRegistrationForm(formConfig: RegistrationField[]) {
    this.registrationForm = new FormGroup({});
    formConfig.forEach(
      field => {
        this.registrationForm.addControl(
          field.name,
          new FormControl('', this.getValidators(field.validations || []))
        )
      }
    );
  }

  private navigateToWelcomePage() {
    this.router.navigate(['/welcome']);
  }
}
