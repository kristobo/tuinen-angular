import { Component, OnInit, Input } from '@angular/core';
import {Customer} from "../model/customer.model";
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-task-customer',
  templateUrl: 'task-customer.component.html',
  providers: [DataService],
})
export class TaskCustomerComponent implements OnInit {
  @Input() id: number;
  customer: Customer;

  constructor(private dataService: DataService) { }

  ngOnInit() {
      this.getCustomerInfo(this.id);
  }

  getCustomerInfo(id: number){

    this.dataService.getCustomer(id)
        .subscribe(
            customer =>{
                this.customer = customer;
            },
            error => {
                console.log(error);
            }

        );
  }

}
