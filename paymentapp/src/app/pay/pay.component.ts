import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout( () => { this.router.navigate(['checkout']); }, 3000);
  }

}
