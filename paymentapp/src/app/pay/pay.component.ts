import { Component, OnInit, ViewChild } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { NooneOrder } from '../model/NooneOrder';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) { }

  order: NooneOrder = new NooneOrder();

  @ViewChild('authCodeInput') input;

  ngOnInit() {
    console.log('on init...');
    this.order.payCode = null;
    this.input.nativeElement.focus();

    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {
      const id = combined[0].get('id');
      console.log('query params : ' + id);
      this.order.id = id;
    });
  }

  payDivOnClick() {
    this.input.nativeElement.focus();
  }

  onValueChange(payCode) {
    this.order.payCode = payCode;
    if (this.order.payCode.length === 18) {
      this.paymentService.pay(this.order).subscribe((response) => {
        const order = JSON.parse(JSON.stringify(response)).data;
        if (order.status === 'SUCCESS') {
          this.router.navigate(['checkout']);
        }
        if (order.status === 'NOTPAY') {

        }
      });
    }
  }

}
