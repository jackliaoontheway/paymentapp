import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {

  private productBaseUrl = 'http://localhost:8080/paymentms/';

  constructor(private http: HttpClient) {

  }

  readRFID() {
    return this.http.get(this.productBaseUrl + '/readrfid');
  }

}
