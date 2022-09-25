import { CustomError } from "../Error/CustomError";
import { PaycamentModel } from "../Model/PaycamentModel";
import { BaseData } from "./BaseData";

export class PaymentData extends BaseData {
  protected tableName: string = "PAYCAMENT_LINX";

  public async createPaycament(paycament: PaycamentModel): Promise<void> {
    try {
      await BaseData.connection(this.tableName).insert({
        id: paycament.getId(),
        amount: paycament.getAmount(),
        items: paycament.getItems(),
        status: paycament.getStatus(),
        code: paycament.getCode(),
        payment_method: paycament.getPaymentMethod()
      });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async getPaycamentById(id:string) : Promise<PaycamentModel| undefined>{

    try {
       const [paycament]:PaycamentModel []= await BaseData.connection(this.tableName).select("*")
        .where({id})
        return paycament
    }
    catch (error:any) {
        console.log(error)
        throw new CustomError(400, error.sqlMessage);

    }
}
}
