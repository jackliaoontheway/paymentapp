import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { NooneOrder } from '../model/NooneOrder';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) { }

  play4: boolean;

  ngOnInit() {
    console.log('on init...');
    this.play4 = true;

    setTimeout(() => {
      this.router.navigate(['']);
    }, 7000);
  }

  ngOnDestroy(): void {
    this.play4 = false;
  }
}
