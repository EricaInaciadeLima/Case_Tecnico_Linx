import { PaycamentData } from "../Data/PaycamentData";
import { CustomError } from "../Error/CustomError";
import {
  PaycamentInputDTO,
  PaycamentModel,
  STATUS,
  TYPE_PAYCAMENT,
} from "../Model/PaycamentModel";
import { IdGenerator } from "../Services/idGenerator";

export class PaycamentBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private paycamentData: PaycamentData
  ) {}
  paycament = async (input: PaycamentInputDTO) => {
    try {
      console.log("Entrei no business paymnet")
      const { amount, payment_method, customer_id } = input;
      let { status } = input;
      if (!amount || !payment_method || !customer_id) {
        throw new CustomError(422, "Missing input");
      }
      if (!status) {
        status = STATUS.ACTIVE;
      }
      const verificationAmout = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      if (!verificationAmout) {
        throw new CustomError(401, `Incorrect o amount`);
      }

      if (
        payment_method !== TYPE_PAYCAMENT.BOLETO &&
        payment_method !== TYPE_PAYCAMENT.CARD
      ) {
        throw new CustomError(403, "Incorrect type, put 'BOLETO' or 'CARD'");
      }
      const code = Date.now();
      const id = this.idGenerator.generate();
      const newPaycament = new PaycamentModel(
        id,
        amount,
        status,
        code,
        payment_method,
        customer_id
      );
      console.log("Entrei no business paymnet newpaycametn", newPaycament)
      await this.paycamentData.createPaycament(newPaycament);

      return newPaycament;
    } catch (error: any) {
      console.log("Entrei no business paymnet error")
      throw new CustomError(error.statusCode, error.message);
    }
  };
  getPaycamentId = async (id: string) => {
    if (!id) {
      throw new CustomError(400, "Enter a paycament id");
    }
    const paycamentId = await this.paycamentData.getPaycamentById(id);

    if (!paycamentId) {
      throw new CustomError(400, "There is no paymcaent with this id");
    }
    return paycamentId;
  };
}
