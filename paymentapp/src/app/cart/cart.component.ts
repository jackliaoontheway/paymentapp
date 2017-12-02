import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router , ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit , OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

  private interval = null;
  private index = 1;

  listenRFID() {
    console.log('CartComponent call backend...' + this.index ++);

    this.http.get('http://localhost:8080/hello')
    .subscribe(response => {
      console.log(response.text());
    });

    if ( this.index === 3 ) {
      this.router.navigate(['pay']);
    }
  }
  ngOnInit() {

    console.log('CartComponent Oninit...');

    this.interval = setInterval( () => { this.listenRFID(); }, 1000);

    /*
    this.route.paramMap.subscribe(params => {
    });
    this.route.snapshot.paramMap.get('id');
    this.route.queryParamMap.subscribe(params => {
    });
    this.route.snapshot.queryParamMap.get('page');
    */

    /*
    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');
      console.log('id : '+ id +' page : '+page);
    });
    */

  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
