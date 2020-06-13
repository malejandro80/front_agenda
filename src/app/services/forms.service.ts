import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class FormsService {
  constructor(private formBuilder: FormBuilder) {}

  ContactForm() {
    return this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      country_code: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  setContact(info, form: FormGroup): void {
    return form.patchValue({
      id: info.id,
      name: info.name,
      surname: info.surname,
      country_code: info.country_code,
      phone: info.phone,
      description: info.description,
    });
  }
}
