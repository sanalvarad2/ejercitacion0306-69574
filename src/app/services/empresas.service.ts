import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import {Empresa} from '../models/empresa';

@Injectable({
  providedIn: "root"
})

export class EmpresasService {
  resourceUrl: string;
  constructor( private httpClient: HttpClient ) {
    this.resourceUrl = "https://pavii.ddns.net/api/empresas/";
  }

  get(){
    return this.httpClient.get(this.resourceUrl)
  }

  getById(obj:Empresa){
    let id = ''
    if(obj){
      id = obj.IdEmpresa.toString(); 
    }
    return this.httpClient.get(this.resourceUrl + id)
  }

  post(obj:Empresa) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj:Empresa) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}