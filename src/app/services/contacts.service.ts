import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../models/contact";

@Injectable({
  providedIn: "root",
})
export class ContactsService {
  constructor(private _HttpClient: HttpClient) {}

  getAll() {
    return this._HttpClient.get<Contact[]>(environment.url).toPromise();
  }

  create(contact: Contact) {
    return this._HttpClient
      .post(environment.url + `create`, contact)
      .toPromise();
  }

  delete(id: number) {
    return this._HttpClient
      .post(environment.url + `delete`, { id: id })
      .toPromise();
  }

  get(id: number) {
    return this._HttpClient
      .post(environment.url + `getContact`, { id: id })
      .toPromise();
  }

  update(contact: Contact) {
    return this._HttpClient
      .post(environment.url + `update`, contact)
      .toPromise();
  }
}
