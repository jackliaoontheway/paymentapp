import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shippingcart',
  templateUrl: './shippingcart.component.html',
  styleUrls: ['./shippingcart.component.css']
})
export class ShippingcartComponent implements OnInit , OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute) { }

  private interval = null;
  private index = 1;

  listenRFID() {
    console.log('ShippingcartComponent call backend...' + this.index ++);
    if ( this.index === 10 ) {
      clearInterval(this.interval);
    }
  }
  ngOnInit() {
    this.interval = setInterval( () => { this.listenRFID(); }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
