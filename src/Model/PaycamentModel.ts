export enum STATUS {
  ACTIVE = "Active",
  CANCELED = "Canceled",
}
export enum TYPE_PAYCAMENT {
  BOLETO = "BOLETO",
  CARD = "CARD"
}

export class PaycamentModel {
  constructor(
    private id: string,
    private amount: number,
    private status: STATUS,
    private code: number,
    private payment_method: TYPE_PAYCAMENT ,
    private customer_id: string
  ) {}

  getId = (): string => {
    return this.id;
  };
  getAmount = (): number => {
    return this.amount;
  };
  
  getStatus = (): string => {
    return this.status;
  };
  getCode = (): number => {
    return this.code;
  };
  getPaymentMethod = (): string => {
    return this.payment_method;
  };
  getCustomerId = (): string => {
    return this.customer_id
  }

  static toUserModel(data: any): PaycamentModel{
      return new PaycamentModel(data.id, data.amount, data.status, data.code, data.payment_method, data.customer_id);
    }
}

export interface PaycamentInputDTO {
  amount: number;
  status: STATUS;
  payment_method: TYPE_PAYCAMENT;
  customer_id: string
}

export interface PaycamentCard {
  customer_id: string
  card_holder_name: string
  card_number: string
  card_expiration_date: string
  card_cvv: string
}

export interface PaycamentBoleto {
    customer_id: string
    amount: number
    payment_method: TYPE_PAYCAMENT 
    status: STATUS
}
