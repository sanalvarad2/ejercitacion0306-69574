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
}