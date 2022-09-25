export enum STATUS {
  Active = "Active",
  Pessoafisica = "Canceled",
}
export class PaycamentModel {
  constructor(
    private id: string,
    private amount: string,
    private items: string,
    private status: STATUS,
    private code: string,
    private payment_method: string
  ) {}

  getId = (): string => {
    return this.id;
  };
  getAmount = (): string => {
    return this.amount;
  };
  getItems = (): string => {
    return this.items;
  };
  getStatus = (): string => {
    return this.status;
  };
  getCode = (): string => {
    return this.code;
  };
  getPaymentMethod = (): string => {
    return this.payment_method;
  };

  static toUserModel(data: any): PaycamentModel{
      return new PaycamentModel(data.id, data.amount, data.items, data.status, data.code, data.payment_method);
    }
}

export interface PaycamentInputDTO {
  amout: string;
  items: string;
  status: STATUS;
  code: string;
  payment_method: string;
}
