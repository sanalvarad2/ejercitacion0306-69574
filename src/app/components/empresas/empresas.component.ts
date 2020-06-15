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
          Validators.required
        ]
      ],
      CantidadEmpleados : [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      IdEmpresa : 0
    });
    this.getEmpresas()
  }

  getEmpresas(){
    this.EmpresaService.get().subscribe((res:Empresa[]) => {
      this.ListEmpresa = res;
    });
  }

  Editar(emp: Empresa){
    this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
    this.EmpresaService.getById(emp).subscribe((res:Empresa) => {
      this.FormReg.patchValue(res);

      
      let fecha = this.FormatearFecha(res.FechaFundacion);
      this.FormReg.controls.FechaFundacion.patchValue(fecha);
      this.Form = 'M';
    });
  }

  Ver(emp:Empresa){
    this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
    this.EmpresaService.getById(emp).subscribe((res:Empresa) => {
      this.FormReg.patchValue(res);

      
      //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      let fecha = this.FormatearFecha(res.FechaFundacion);
      this.FormReg.controls.FechaFundacion.patchValue(fecha);
      this.Form = 'C';
    });
  }

  Volver() {
    this.getEmpresas();
    this.Form = "L";
  }

  Grabar(){
    this.submitted = true;
    if (this.FormReg.invalid) {
      return;
    }
    const itemCopy = { ...this.FormReg.value };

    var fecha:Date = new Date(itemCopy.FechaFundacion);   
    itemCopy.FechaFundacion = fecha.toISOString();

    if(this.Form == 'A'){
      itemCopy.IdEmpresa = 0;
      this.EmpresaService.post(itemCopy).subscribe((res:Empresa)=>{
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Ver(res);
      })
    }else if (this.Form == 'M'){
      this.EmpresaService.put(itemCopy.IdEmpresa, itemCopy).subscribe((res:any)=>{
        this.Volver();
        this.modalDialogService.Alert('Registro Modificado Correctamente.');
        this.Ver(res);
      })
    }
  }

  Agregar() {
    this.Form = "A";
    this.FormReg.reset();

    this.submitted = false;
    this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  Eliminar(){
    let id = this.FormReg.controls.IdEmpresa.value;
    if(id){
      this.EmpresaService.delete(id).subscribe((res:any)=>{
        this.modalDialogService.Alert("Eliminada con Exito")
        this.Volver();
      });
    }
  }

  private FormatearFecha(date:string){
    const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
  }
  
}