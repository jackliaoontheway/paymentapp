import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router , ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { OrderItem } from '../model/OrderItem';
import { PaymentService } from '../services/payment.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit , OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) { }

  interval = null;

  orderItemList: OrderItem[];

  displayedColumns = ['name', 'qty', 'price', 'itemFee'];
  dataSource = new MatTableDataSource<OrderItem>();
  totalFee: number;


  listenRFID() {
    console.log('CartComponent read rfid...');
    this.paymentService.readRFID().subscribe((response) => {
      const hasData = JSON.parse(JSON.stringify(response)).hasData;
      if (hasData) {
        this.orderItemList = JSON.parse(JSON.stringify(response)).data;
        this.totalFee = JSON.parse(JSON.stringify(response)).totalFee;
        this.dataSource.data = this.orderItemList;
      } else {
        this.orderItemList = null;
        this.totalFee = 0;
        this.dataSource.data = null;
      }
    });
  }

  ngOnInit() {

    this.orderItemList = null;
    this.totalFee = 0;
    this.dataSource.data = null;

    console.log('on init...');
    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {
      const serverResponse = combined[1].get('serverResponse');
      console.log('query params : ' + serverResponse);
      this.orderItemList = JSON.parse(serverResponse).data;
      this.totalFee = JSON.parse(serverResponse).totalFee;
      this.dataSource.data = this.orderItemList;

      this.interval = setInterval( () => { this.listenRFID(); }, 3000);

    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  submit() {
    this.paymentService.createOrder(this.orderItemList, this.totalFee).subscribe((response) => {
      const order = JSON.parse(JSON.stringify(response)).data;
      if (order) {
        this.router.navigate(['pay', order.id]);
      }
    });
  }

}
