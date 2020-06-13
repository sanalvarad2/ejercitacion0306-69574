import { Component, OnInit } from '@angular/core';
import {Empresa} from '../../models/empresa';
import {EmpresasService} from '../../services/empresas.service';
import {ModalDialogService} from '../../services/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  ListForm = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  Form = "L";

  ListEmpresa:Empresa[] = [];

  FormFiltro: FormGroup;
  FormReg: FormGroup;

  constructor(
    private EmpresaService: EmpresasService,
    private modalDialogService: ModalDialogService,
    public formBuilder: FormBuilder
    ){ }
  
  ngOnInit() {
    this.getEmpresas()
  }

  getEmpresas(){
    this.EmpresaService.get().subscribe((res:Empresa[]) => {
      this.ListEmpresa = res;
    });
  }

  Editar(emp: Empresa){
    this.EmpresaService.getById(emp).subscribe((res:Empresa) => {
      alert(res.RazonSocial);
    });
  }

  
}