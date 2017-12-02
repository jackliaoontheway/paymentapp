import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PayComponent } from './pay/pay.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PayComponent,
    CheckoutComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'cart/:id/:name',
        component : CartComponent
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
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
