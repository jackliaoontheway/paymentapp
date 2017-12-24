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

  interval = null;
  timeTask = null;

  @ViewChild('authCodeInput') input;

  listenRFID() {
    console.log('CartComponent read rfid...');
    this.paymentService.readRFID().subscribe((response) => {
      const hasData = JSON.parse(JSON.stringify(response)).hasData;
      if ( !hasData ) {
        this.router.navigate(['']);
      }
    });
  }

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
      this.interval = setInterval( () => { this.listenRFID(); }, 3000);

      this.timeTask = setTimeout(() => {
        this.router.navigate(['']);
      }, 30000);

    });
  }

  ngOnDestroy(): void {
    this.play3 = false;
    clearInterval(this.interval);
    clearTimeout(this.timeTask);
  }

  payDivOnClick() {
    this.input.nativeElement.focus();
  }

  onValueChange(authCode) {
    console.log(authCode);
    if (authCode.length === 18) {
      clearInterval(this.interval);
      clearTimeout(this.timeTask);
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
    if ( this.order.queryTimes >= 6) {
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
