import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Material } from '../model/material.model';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  providers: [MaterialService],
})
export class MaterialListComponent implements OnInit {
  materialList: Material[];
  loading: boolean;
  error: String;

  constructor(private dataService: DataService,
              private materialService: MaterialService) { }

  ngOnInit() {
    this.getAllMaterials();
  }

  // Get all tasks for logged in user.
  getAllMaterials(){
    this.loading = true;
    this.dataService.getAllMaterials()
        .subscribe(
            materials =>{
              this.loading = false;
              this.materialList = materials;
              this.materialService.saveList(materials);
              },
            error => {
              this.error = error;
              this.loading = false;
              console.log(error);
            }
        );
  }

}
