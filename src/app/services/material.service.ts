import { Injectable } from '@angular/core';
import { Material } from '../model/material.model';

@Injectable()
export class MaterialService {

  constructor() { }

  // Save job
  public saveList(materialList: any): void{
    sessionStorage.setItem('materialList', JSON.stringify(materialList));

  }

  public getMaterialById(mid: number){
    let materialList: any = JSON.parse(sessionStorage.getItem('materialList'));
    let material = materialList.find(x => x.id == mid);
    return material;
  }

}
