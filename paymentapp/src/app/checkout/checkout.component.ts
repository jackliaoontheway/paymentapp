import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout( () => { this.router.navigate(['']); }, 3000);
  }

}
