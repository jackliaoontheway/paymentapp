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
    this.input.nativeElement.value = '';
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

  onValueChange(authCode) {
    console.log(authCode);
    if (authCode.length === 18) {
      this.order.payCode = authCode;
      this.pay();
    }
  }

  pay () {
    this.paymentService.pay(this.order).subscribe((response) => {
      this.input.nativeElement.value = '';
      const orderResp = JSON.parse(JSON.stringify(response)).data;
      this.processStatus(orderResp.status);
    });
  }

  query () {
    this.paymentService.queryOrderStatus(this.order).subscribe((response) => {
      const orderResp = JSON.parse(JSON.stringify(response)).data;
      this.processStatus(orderResp.status);
    });
  }

  completeOrder() {
    // this.paymentService.completeOrder(this.order).subscribe((response) => {
    //   this.router.navigate(['checkout']);
    // });
    this.router.navigate(['checkout']);
  }

  processStatus (status: string) {
    if ( status === 'SUCCESS' ) {
      this.completeOrder();
    } else if (status === 'NOTPAY' || status === 'USERPAYING') {
      this.order.queryTimes ++;
      if (this.order.queryTimes < 5) {
        setTimeout(this.query(), 3000);
      } else {

      }
    } else {

    }
  }

}
