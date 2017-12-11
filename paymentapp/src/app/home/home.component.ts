import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { OrderItem } from '../model/OrderItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) { }

  private interval = null;

  listenRFID() {
    console.log('read rfid...');
    this.paymentService.readRFID().subscribe((response) => {
      const hasData = JSON.parse(JSON.stringify(response)).hasData;
      if (hasData) {
        this.router.navigate(['cart'], {
          queryParams : {serverResponse : JSON.stringify(response)}
        });
      }
    });
  }

  ngOnInit() {
    this.interval = setInterval( () => { this.listenRFID(); }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
