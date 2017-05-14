import { Component, OnInit, Input } from '@angular/core';
import { Material } from "../model/material.model";

@Component({
  selector: 'app-material-row',
  templateUrl: './material-row.component.html',
})
export class MaterialRowComponent implements OnInit {
  @Input() material: Material;

  constructor() { }

  ngOnInit() {
  }

}
