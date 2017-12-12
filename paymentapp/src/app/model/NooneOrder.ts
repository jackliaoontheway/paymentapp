import { OrderItem } from './OrderItem';

export class NooneOrder {

    id: string;
    orderNum: number;
    totalFee: number;
    orderItemList: OrderItem[];

    payCode: string;

}
