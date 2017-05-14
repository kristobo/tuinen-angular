import { Component, OnInit, Input } from '@angular/core';
import { Material } from "../model/material.model";

@Component({
  selector: 'app-material-row-edit',
  templateUrl: './material-row-edit.component.html',
})
export class MaterialRowEditComponent implements OnInit {
  @Input() material: Material;

  constructor() { }

  ngOnInit() {
  }

}
