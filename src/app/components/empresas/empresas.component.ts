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
  Titulo = "Empresas"; 
  ListForm = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  Form = "L";
  submitted = false;
  ListEmpresa:Empresa[] = [];

  //FormFiltro: FormGroup;
  FormReg: FormGroup;

  constructor(
    private EmpresaService: EmpresasService,
    private modalDialogService: ModalDialogService,
    public formBuilder: FormBuilder
    ){ }
  
  ngOnInit() {
    this.FormReg = this.formBuilder.group({
      RazonSocial : ["", [Validators.required, Validators.minLength(4), Validators.maxLength(55)]],
      FechaFundacion : [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}"
          )
        ]
      ],
      CantidadEmpleados : [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      IdEmpresa : [0]
    });
    this.getEmpresas()
  }

  getEmpresas(){
    this.EmpresaService.get().subscribe((res:Empresa[]) => {
      this.ListEmpresa = res;
    });
  }

  Editar(emp: Empresa){
    this.EmpresaService.getById(emp).subscribe((res:Empresa) => {
      this.FormReg.patchValue(res);

      //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      let fecha = this.FormatearFecha(res.FechaFundacion);
      this.FormReg.controls.FechaFundacion.patchValue(fecha);
      this.Form = 'M';
    });
  }

  Ver(emp:Empresa){
    this.EmpresaService.getById(emp).subscribe((res:Empresa) => {
      this.FormReg.patchValue(res);

      
      //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      let fecha = this.FormatearFecha(res.FechaFundacion);
      this.FormReg.controls.FechaFundacion.patchValue(fecha);
      this.Form = 'C';
    });
  }

  Volver() {
    this.Form = "L";
  }

  Grabar(){
    
  }

  Agregar() {
    this.Form = "A";
    this.FormReg.reset(this.FormReg.value);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  private FormatearFecha(date:Date){
    const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
  }
  
}