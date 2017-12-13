import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NooneOrder } from '../model/NooneOrder';
import { OrderItem } from '../model/OrderItem';

@Injectable()
export class PaymentService {

  private productBaseUrl = 'http://localhost:8080/paymentms/';

  constructor(private http: HttpClient) {

  }

  readRFID() {
    return this.http.get(this.productBaseUrl + '/readrfid');
  }

  createOrder(orderItemList: OrderItem[], totalFee: number) {
    const order = new NooneOrder();
    order.orderItemList = orderItemList;
    order.totalFee = totalFee;
    return this.http.post(this.productBaseUrl + '/createorder', order);
  }

  pay(order: NooneOrder) {
    return this.http.post(this.productBaseUrl + '/pay', order);
  }

  queryOrderStatus(order: NooneOrder) {
    return this.http.post(this.productBaseUrl + '/queryorderstatus', order);
  }

  completeOrder(order: NooneOrder) {
    return this.http.post(this.productBaseUrl + '/completeorder', order);
  }

}
