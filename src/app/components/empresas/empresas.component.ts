import { Component, OnInit } from '@angular/core';
import {Empresa} from '../../models/empresa';
import {EmpresasService} from '../../services/empresas.service';
import {ModalDialogService} from '../../services/modal-dialog.service';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  ListEmpresa:Empresa[] = [];

  constructor(
    private EmpresaService: EmpresasService,
    private modalDialogService: ModalDialogService
    ){ }
  
  ngOnInit() {
    this.getEmpresas()
  }

  getEmpresas(){
    this.EmpresaService.getAll().subscribe((res:Empresa[]) => {
      this.ListEmpresa = res;
    });
  }
}