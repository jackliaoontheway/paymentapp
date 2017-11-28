import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { PayComponent } from './pay/pay.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingcartComponent } from './shippingcart/shippingcart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    PayComponent,
    CheckoutComponent,
    ShippingcartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'shippingcart',
        component : ShippingcartComponent
      },
      {
        path : 'pay',
        component : PayComponent
      },
      {
        path : 'checkout',
        component : CheckoutComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
