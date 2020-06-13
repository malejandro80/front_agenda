import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ContactsService } from "./services/contacts.service";

import { Contact } from "./models/contact";
import { FormsService } from "./services/forms.service";
import { ThrowStmt } from "@angular/compiler";

declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "frontAgenda";
  updateButton: Boolean = false;
  contactForm: FormGroup;
  Contacts: Contact[] = [];
  _contacts: any;

  constructor(_contact: ContactsService, private _initForm: FormsService) {
    this._contacts = _contact;
    this.contactForm = _initForm.ContactForm();
    this.initContacts();
  }

  initContacts() {
    this._contacts.getAll().then((data) => {
      this.Contacts = data;
      console.log(data);
    });
  }

  saveContact() {
    const newContact = this.contactForm.value;
    delete newContact.id;
    this._contacts.create(newContact).then((data) => {
      if (data.response === "success") {
        this.initContacts();
        $("#staticBackdrop").modal("toggle");
        this.contactForm.reset();
      }
    });
  }

  delete(id: number) {
    const question = confirm("Desea eliminar este contacto?");
    if (question) {
      this._contacts.delete(id).then((data) => {
        if (data.response === "success") {
          this.initContacts();
        }
      });
    }
  }

  show(id: number) {
    this.updateButton = true;
    this._contacts.get(id).then((data) => {
      this._initForm.setContact(data[0], this.contactForm);
      $("#staticBackdrop").modal("show");
    });
  }

  update() {
    this._contacts.update(this.contactForm.value).then((data) => {
      this.contactForm.reset();
      this.initContacts();
      $("#staticBackdrop").modal("toggle");
    });
  }

  setUpdateButton() {
    this.updateButton = false;
    this.contactForm.reset();
  }
}
