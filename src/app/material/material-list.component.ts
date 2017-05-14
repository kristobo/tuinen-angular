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
              this.materialList = this.sortedMaterials(materials);
              this.materialService.saveList(materials);
              },
            error => {
              this.error = error;
              this.loading = false;
              console.log(error);
            }
        );
  }

  sortedMaterials(materials: Material[]): Material[] {
        return materials.sort((a: Material, b: Material) => {
            if (a.naam < b.naam) return -1;
            else if (a.naam > b.naam) return 1;
            else return 0;
        });
  }

}
