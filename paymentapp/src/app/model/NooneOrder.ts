import { OrderItem } from './OrderItem';

export class NooneOrder {

    id: string;
    status: string;
    orderNum: number;
    totalFee: number;
    orderItemList: OrderItem[];

    payCode: string;

    queryTimes = 0;

}
