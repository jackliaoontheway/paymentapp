import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute) { }

  private interval = null;

  private index = 1;


  listenRFID() {
    console.log('HomeComponent call backend...' + (this.index++));
    if ( this.index === 10 ) {
      this.router.navigate(['shippingcart',999,'bb'],{
        queryParams : {page : 1,order : 'newest'}
      });
    }
  }

  ngOnInit() {
    this.interval = setInterval( () => { this.listenRFID(); }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
