import { Injectable } from "@angular/core";
import { environment } from "./enviroment";


@Injectable({
    providedIn: 'root'
})
export class GlobalUrl {
  private _baseUrl: string = environment.api;


  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }
}