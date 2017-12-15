import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
export class PayComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) { }

  order: NooneOrder = new NooneOrder();

  play3: boolean;

  @ViewChild('authCodeInput') input;

  ngOnInit() {
    console.log('on init...');
    this.play3 = true;
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

  ngOnDestroy(): void {
    this.play3 = false;
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
    console.log('query count : ' + this.order.queryTimes);
    this.order.queryTimes ++;
    if ( this.order.queryTimes === 7) {
      this.router.navigate(['']);
      return;
    }
    this.paymentService.queryOrderStatus(this.order).subscribe((response) => {
      const orderResp = JSON.parse(JSON.stringify(response)).data;
      this.processStatus(orderResp.status);
    });
  }

  completeOrder() {
    this.router.navigate(['checkout']);
  }

  processStatus (status: string) {
    console.log('process status : ' + status);
    if ( status === 'SUCCESS' ) {
      this.completeOrder();
    } else if (status === 'USERPAYING') {
      setTimeout( () => {
        this.query();
      }, 5000);
    } else {
      this.router.navigate(['']);
    }
  }

}
